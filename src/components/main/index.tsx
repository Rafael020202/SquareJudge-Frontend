import React from 'react';
import { Box, Toolbar } from '@mui/material';

import { drawerWidth } from '../../config/constants';

const Main: React.FC = ({children}) => {
    return (
        <Box
            component="main"
            sx={{ 
                flexGrow: 1, 
                p: 5, 
                width: { sm: `calc(100% - ${drawerWidth}px)` }, 
                height:  `100vh`,
                marginLeft: 'auto',
                backgroundColor: '#ededed',
                overflowY: 'auto'
            }}
        >
             <Box
                sx={{ 
                    p: 2, 
                    marginLeft: 'auto',
                    marginTop: '50px',
                    backgroundColor: '#fff',
                    borderRadius: '10px'
                }}
            >
                {/*<Toolbar />*/}
                {children}
            </Box>
        </Box>
    );
}

export default Main;