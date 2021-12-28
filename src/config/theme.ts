import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { 
        main: '#343434'
      }
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#343434',
            color: '#fff',
            svg: {
              color: '#fff'
            }
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: '#343434',
            borderColor: '#343434'
          }
        }
      },
    }
  });