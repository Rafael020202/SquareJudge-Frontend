import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { 
        main: '#fff'
      }
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            color: '#343434',
            svg: {
              color: '#6eb2ff'
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

      MuiCardHeader: {
        styleOverrides: {
          root: {
            backgroundColor: '#ededed',
          }
        }
      },

      MuiCard: {
        styleOverrides: {
          root: {
            textAlign: 'center'
          }
        }
      }
    }
  });