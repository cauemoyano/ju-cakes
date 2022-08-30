import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const useProtectedRoute = (admin: boolean = false) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const authorized = user ? (admin ? !!user.admin : true) : false;
  useLayoutEffect(() => {
    console.log(loading, authorized);
    if (!authorized && !loading) {
      router.push("/");
    }
  }, [authorized]);

  return { authorized };
};

export default useProtectedRoute;
