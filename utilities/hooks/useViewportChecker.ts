import React, { useEffect, useState } from "react";

export type MediaQueriesTypes = {
  xs: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};

const useViewportChecker = () => {
  const [mediaQueries, setMediaQueries] = useState<MediaQueriesTypes>({
    xs: false,
    md: false,
    lg: false,
    xl: false,
  });
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 375) {
        setMediaQueries({
          xs: true,
          md: false,
          lg: false,
          xl: false,
        });
        return;
      }
      if (screenWidth >= 768 && screenWidth < 992) {
        setMediaQueries({
          xs: false,
          md: true,
          lg: false,
          xl: false,
        });

        return;
      }
      if (screenWidth >= 992 && screenWidth < 1280) {
        setMediaQueries({
          xs: false,
          md: false,
          lg: true,
          xl: false,
        });
        return;
      }
      if (screenWidth >= 1280) {
        setMediaQueries({
          xs: false,
          md: false,
          lg: false,
          xl: true,
        });
        return;
      }
      setMediaQueries({
        xs: false,
        md: false,
        lg: false,
        xl: false,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { mediaQueries };
};

export default useViewportChecker;
