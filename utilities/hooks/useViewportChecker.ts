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
  const [moreThan, setMoreThan] = useState({ md: false });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const allViews = {
        xs: false,
        md: false,
        lg: false,
        xl: false,
      };
      if (screenWidth >= 768) {
        setMoreThan({ md: true });
      } else {
        setMoreThan({ md: false });
      }
      if (screenWidth < 375) {
        setMediaQueries({ ...allViews, xs: true });
        return;
      }
      if (screenWidth >= 768 && screenWidth < 992) {
        setMediaQueries({ ...allViews, md: true });

        return;
      }
      if (screenWidth >= 992 && screenWidth < 1280) {
        setMediaQueries({ ...allViews, lg: true });
        return;
      }
      if (screenWidth >= 1280) {
        setMediaQueries({ ...allViews, xl: true });
        return;
      }

      setMediaQueries({ ...allViews });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { mediaQueries, moreThan };
};

export default useViewportChecker;
