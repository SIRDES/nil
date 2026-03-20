import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        await dbConnect();

        const user = await AdminUser.findOne({
          email: (credentials.email as string).toLowerCase(),
        });

        if (!user) {
          throw new Error("Invalid credentials or inactive account.");
        }

        if (user.status?.toLowerCase() === "inactive" || user.status?.toLowerCase() === "pending") {
          throw new Error("Invalid credentials or inactive account.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials or inactive account.");
        }

        // Update last login timestamp
        await AdminUser.findByIdAndUpdate(user._id, { lastLogin: new Date() });

        return {
          _id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          // lastLoginAt: user.lastLogin,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, persist custom fields into the JWT
      if (user) {
        token.role = (user as Record<string, unknown>).role as string;
        token._id = (user as Record<string, unknown>)._id as string;
        token.firstName = (user as Record<string, unknown>).firstName as string;
        token.lastName = (user as Record<string, unknown>).lastName as string;
        token.status = (user as Record<string, unknown>).status as string;
        token.avatarUrl = (user as Record<string, unknown>).avatarUrl as string;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass custom JWT fields into the session object for the frontend
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).role = token.role;
        (session.user as unknown as Record<string, unknown>)._id = token._id;
        (session.user as unknown as Record<string, unknown>).firstName = token.firstName;
        (session.user as unknown as Record<string, unknown>).lastName = token.lastName;
        (session.user as unknown as Record<string, unknown>).status = token.status;
        (session.user as unknown as Record<string, unknown>).avatarUrl = token.avatarUrl;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      if (isOnLoginPage) {
        if (isLoggedIn)
          return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }

      if (isOnAdmin) {
        return isLoggedIn;
      }

      return true;
    },
  },
});








// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/mongodb";
// import AdminUser from "@/models/AdminUser";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       name: "Admin Login",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Please provide both email and password.");
//         }

//         await dbConnect();

//         const user = await AdminUser.findOne({
//           email: (credentials.email as string).toLowerCase(),
//         });

//         if (!user) {
//           throw new Error("Invalid credentials or inactive account.");
//         }

//         if (user.status === "Inactive" || user.status === "Pending") {
//           throw new Error("Invalid credentials or inactive account.");
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.passwordHash
//         );

//         if (!isPasswordValid) {
//           throw new Error("Invalid credentials or inactive account.");
//         }

//         // Update last login timestamp
//         await AdminUser.findByIdAndUpdate(user._id, { lastLogin: new Date() });

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: `${user.firstName} ${user.lastName}`,
//           role: user.role,
//           firstName: user.firstName,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/admin/login",
//   },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // On initial sign-in, persist custom fields into the JWT
  //     if (user) {
  //       token.role = (user as Record<string, unknown>).role as string;
  //       token.id = user.id as string;
  //       token.firstName = (user as Record<string, unknown>).firstName as string;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Pass custom JWT fields into the session object for the frontend
  //     if (session.user) {
  //       (session.user as Record<string, unknown>).role = token.role;
  //       (session.user as Record<string, unknown>).id = token.id;
  //       (session.user as Record<string, unknown>).firstName = token.firstName;
  //     }
  //     return session;
  //   },
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnAdmin = nextUrl.pathname.startsWith("/admin");
  //     const isOnLoginPage = nextUrl.pathname === "/admin/login";

  //     if (isOnLoginPage) {
  //       if (isLoggedIn)
  //         return Response.redirect(new URL("/admin", nextUrl));
  //       return true;
  //     }

  //     if (isOnAdmin) {
  //       return isLoggedIn;
  //     }

  //     return true;
  //   },
  // },
// });
