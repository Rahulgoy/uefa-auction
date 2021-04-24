import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#141416",
    },
    primary: {
      main: "#e8eaf6",
      light: "#118ab2",
      dark: "#3949ab",
    },
    // secondary: {
    //   main: '1B2C11',
    //   light: 'd7a864'
    // }
  },

  typography: {
    fontFamily: [
          'Nunito'
    ].join(','),
  },
});

export default theme;
