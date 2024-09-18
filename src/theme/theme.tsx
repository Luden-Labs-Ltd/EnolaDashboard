import { alpha, createTheme, darken, outlinedInputClasses } from "@mui/material";

const uiColors = {
  neutral: {
    first: {
      // 0: '#ffffff',
      // 50: '#f1f5fb',
      100: "#dde5f6",
      // 200: '#c6d4f0',
      // 300: '#afc2e9',
      // 400: '#9db5e5',
      // 500: '#8ca8e0',
      // 600: '#84a0dc',
      // 700: '#7997d8',
      // 800: '#6f8dd3',
      // 900: '#5c7dcb',
      500: "#586794",
      1000: "#313a56",
    },
    second: {
      0: "#ffffff",
      100: "#f5f8ff",
      200: "#eceef3",
      300: "#e3e5ed",
      // 400: '#dadde7',
      // 500: '#d0d5e1',
      // 600: '#c7ccdb',
      // 700: '#bec4d5',
      // 800: '#b5bbcf',
      800: "#acb3c9",
      900: "#a3abc3",
      1000: "#050C21",
    },
  },
  accent: {
    first: {
      50: "#fef8ed",
      100: "#fbedd2",
      200: "#f9e1b5",
      300: "#f7d497",
      400: "#f5cb80",
      500: "#f3c26a",
      600: "#f1bc62",
      700: "#efb457",
      800: "#edac4d",
      900: "#ea9f3c",
    },
    second: {},
  },
  semantic: {
    error: {
      // red colors
      100: "#ffe3e3",
      200: "#ffbdbd",
      300: "#ff9b9b",
      400: "#f86a6a",
      500: "#ef4e4e",
      600: "#e12d39",
      700: "#cf1124",
      800: "#ab091e",
      900: "#8a041a",
      1000: "#610316",
    },
    warning: {
      100: "#fffbea",
      200: "#fff3c4",
      300: "#fce588",
      400: "#fadb5f",
      500: "#f7c948",
      600: "#f4ad1a",
      700: "#de911d",
      800: "#cb6e17",
      900: "#b44d12",
      1000: "#8d2b0b",
    },
    success: {
      // green colors
      100: "#effcf6",
      200: "#c6f7e2",
      300: "#8eedc7",
      400: "#65d6ad",
      500: "#3ebd93",
      600: "#27ab83",
      700: "#199473",
      800: "#147d64",
      900: "#0c6b58",
      1000: "#014d40",
    },
    blue: {
      100: "#0466C8",
      200: "#0353A4",
      300: "#023E7D",
      400: "#002855",
      500: "#001845",
      600: "#001233",
    },
    blueGray: {
      100: "#979DAC",
      200: "#7D8597",
      300: "#5C677D",
      400: "#33415C",
    },
    grey: {
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
    },
  },
};

export const theme = createTheme({
  uiColors,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      tablet: 1024,
      lg: 1280,
      xl: 1920,
    },
    keys: ["xs", "sm", "md", "tablet", "lg", "xl"],
  },
  palette: {
    primary: {
      main: uiColors.neutral.first[1000],
    },

    secondary: {
      main: uiColors.neutral.second[900],
    },

    success: {
      main: darken(uiColors.semantic.success[900], 0.6),
    },

    warning: {
      main: darken(uiColors.semantic.warning[600], 0.6),
    },

    error: {
      main: darken(uiColors.semantic.error[800], 0.6),
    },

    background: {
      default: "#FFFFFF", // #BCEAFF
    },
    action: {
      active: alpha("#002733", 0.54),
      selected: alpha("#002733", 0.08),
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica Neue",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Space Grotesk",
    ],
    fontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: 36,
      lineHeight: "40px",
      letterSpacing: "-1.5px",
      color: uiColors.neutral.first[1000],
    },
    h2: {
      fontWeight: 400,
      fontSize: 32,
      lineHeight: "32px",
      letterSpacing: "-0.5px",
      color: uiColors.neutral.first[1000],
    },
    h3: {
      fontWeight: 400,
      fontSize: 28,
      lineHeight: "28px",
      color: uiColors.neutral.first[1000],
    },
    h4: {
      fontWeight: 400,
      fontSize: 24,
      lineHeight: "26px",
      letterSpacing: "0.25px",
      color: uiColors.neutral.first[1000],
    },
    h5: {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: "24px",
      letterSpacing: "0.25px",
      color: uiColors.neutral.first[1000],
    },
    h6: {
      fontSize: 18,
      lineHeight: "24px",
      fontWeight: 600,
      letterSpacing: "0.25px",
      textTransform: "none",
      color: uiColors.neutral.first[1000],
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "0.15px",
      color: uiColors.neutral.first[1000],
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "20px",
      letterSpacing: "0.1px",
      color: uiColors.neutral.first[1000],
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.15px",
      color: uiColors.neutral.first[1000],
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.17px",
      color: uiColors.neutral.first[1000],
    },
  },
  props: {
    MuiSelect: {
      // IconComponent: SelectOpenStatusIcon,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: uiColors.neutral.second[100],
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 36,
          paddingRight: 36,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: uiColors.semantic.error[800],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        input: {
          padding: "14.5px 12px",
          background: "#FFFFFF",
        },
        [outlinedInputClasses.notchedOutline]: {
          borderColor: uiColors.neutral.second[300],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "10px 12px",
          // borderWidth: 2,
          boxSizing: "border-box",
          fontFamily: "Space Grotesk",
          fontSize: 16,
          fontWeight: 700,
          lineHeight: "20px",
          letterSpacing: 0,
          textAlign: "center",
        },
        sizeSmall: {
          padding: "8px 12px",
          lineHeight: "18px",
        },
        sizeLarge: {
          lineHeight: "32px",
        },
        containedPrimary: {
          backgroundColor: uiColors.neutral.first[1000],
          // border: `2px solid ${uiColors.neutral.first[1000]}`,
          color: uiColors.neutral.second[100],
          "&:hover": {
            backgroundColor: uiColors.neutral.first[500],
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: 16,
        },
        fontSizeMedium: {
          fontSize: 20,
        },
        fontSizeLarge: {
          fontSize: 24,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${uiColors.neutral.second[800]}`,
          boxSizing: "border-box",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          height: "100%",
          boxSizing: "border-box",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: darken(uiColors.neutral.first[1000], 0.23),
        },
      },
    },
  },
});