import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // on initial load - run auth check
    /*  authCheck(router.asPath); */

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = (url: string) => {
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  return <div>RouteGuard</div>;
};

export default RouteGuard;
