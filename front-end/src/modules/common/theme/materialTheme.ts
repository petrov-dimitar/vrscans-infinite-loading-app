import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e'
  },
  palette: {
    primary: {
      main: '#FE7F2D',
      darker: '#053e85'
    },
    neutral: {
      main: '#090C02',
      contrastText: '#fff'
    }
  }
});

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}
