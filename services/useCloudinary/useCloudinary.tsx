import React, { useCallback } from "react";

const useCloudinary = () => {
  const uploadFile = useCallback((file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
    );
    return fetch("https://api.cloudinary.com/v1_1/caue-moyano/image/upload", {
      method: "POST",
      body: formData,
    });
  }, []);
  return { uploadFile };
};

export default useCloudinary;
