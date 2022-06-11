import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Protected = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return <Box mt={20}></Box>;
};

export default Protected;
