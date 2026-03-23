/**
 * Generates a Cloudinary image URL with specified transformations.
 * @param publicId - The public ID of the image.
 * @param folderName - The folder name of the image.
 * @param type - The type of transformation to apply.
 */
export function getImageUrl(publicId: string, type: 'thumbnail' | 'large' | 'profile' = 'thumbnail') {
  // Use NEXT_PUBLIC_ if available (for client-side), otherwise fallback to server-side env var
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

  if (!cloudName) {
    console.warn('Cloudinary cloud name is not defined. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment.');
    return '';
  }

  const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  // const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${cloudName}/image/upload/techschool/${folderName}/`;

  // Define your transformation settings
  const transforms = {
    thumbnail: "w_300,h_300,c_fill,g_auto,f_auto,q_auto", // For the program grid
    large: "w_800,c_limit,f_auto,q_auto",               // For the program detail page
    profile: "w_150,h_150,c_thumb,g_face,r_max"         // For user profiles
  };

  // const imageUrl = `${CLOUDINARY_BASE_URL}${transforms[type]}/${folderName}/${publicId}`;
  const imageUrl = `${CLOUDINARY_BASE_URL}${transforms[type]}/${publicId}`;
  console.log(imageUrl);
  return imageUrl;
}
