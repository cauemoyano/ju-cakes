import React, { useCallback } from "react";

/* export const uploadFileUrl =
  "https://res.cloudinary.com/caue-moyano/image/upload/c_scale,h_512,w_512";
 */ export const uploadFileUrl =
  "https://api.cloudinary.com/v1_1/caue-moyano/image/upload";

const useCloudinary = () => {
  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
    );
    const res = await fetch(uploadFileUrl, {
      method: "POST",
      body: formData,
    });

    return res.json();
  }, []);
  return { uploadFile };
};

export default useCloudinary;
