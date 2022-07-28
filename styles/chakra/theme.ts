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
  primaryNumbered: {
    100: "#FDE1EE",
    300: "#FF99C9",
    500: "#690233",
    600: "#690233",
    700: "#59052D",
    900: "#470122",
  },
  secondaryNumbered: {
    100: "#C4F4F4",
    300: "#00E0DD",
    500: "#04403F",
    600: "#02403F",
    700: "#013A39",
    900: "#002F2E",
  },
  alternativeNumbered: {
    100: "#C0EFE6",
    300: "#53DEC2",
    500: "#339B86",
    600: "#04866C",
    700: "#035444",
    900: "#035444",
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
