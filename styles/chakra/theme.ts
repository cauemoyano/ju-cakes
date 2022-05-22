import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    light: "#FDE1EE",
    main: "#FF99C9",
    dark: "#690233",
  },
  secondary: {
    light: "#C4F4F4",
    main: "#00E0DD",
    dark: "#04403F",
  },
  alternative: {
    light: "#C0EFE6",
    main: "#53DEC2",
    dark: "#04866C",
  },
  light: {
    alternative: "#FDFAF7",
    main: "#FBF9FF",
  },
  dark: {
    main: "#000807",
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "5px",
    },
    /* sizes: {
        small: {
          px: 5,
          h: "50px",
          fontSize: "20px",
        },
      }, */
    variants: {
      primary: {
        bg: "primary.dark",
        color: "primary.light",
      },
      primaryInverted: {
        bg: "transparent",
        color: "primary.dark",
      },
      primaryGhost: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "primary.dark",
        color: "primary.dark",
        _hover: {
          bg: "primary.light",
        },
      },
    },
  },
  IconButton: {
    variants: {
      primaryInverted: {
        bg: "transparent",
        color: "primary.dark",
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "500",
      color: "#000807",
    },
    /*     sizes: {
      small: {
        fontSize: "20px",
      },
      medium: { fontSize: "25px" },
      large: { fontSize: "30px" },
    }, */
  },
  Text: {
    baseStyle: {
      color: "#000807",
    },
  },
};

const theme = extendTheme({
  fonts: {
    heading: "Eczar, serif",
    body: "Inter, sans-serif",
    eczar: "Eczar, serif",
    inter: "Inter, sans-serif",
  },
  colors: { ...colors },
  components: { ...components },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "light.main",
      },
      "#__next": {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      },
      ".main": {
        flex: 1,
      },
      /*  a: {
        color: "teal.500",
      }, */
    },
  },
});

export default theme;
