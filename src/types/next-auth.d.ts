import { User } from "firebase/auth";
// import { DocumentData } from "firebase/firestore";
import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      role: "Super Admin" | "Registrar" | "Program Manager" | "Instructor" | "Editor" | "Support";
      status: "Active" | "Inactive" | "Suspended" | "Pending";
      // lastLoginAt?: string;
      avatarUrl?: string;
    };
  }
}
