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
  Heading: {
    baseStyle: {
      fontWeight: "400",
    },
    /*     sizes: {
      small: {
        fontSize: "20px",
      },
      medium: { fontSize: "25px" },
      large: { fontSize: "30px" },
    }, */
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
