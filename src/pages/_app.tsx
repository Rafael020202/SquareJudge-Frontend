import { AuthProvider } from '../context/AuthContext';
import { MobileProviver } from '../context/MobileContext';
import '../styles/global.scss';
import { darkTheme } from '../config/theme';

import { ThemeProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <MobileProviver>
          <Component {...pageProps} />
        </MobileProviver>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp
