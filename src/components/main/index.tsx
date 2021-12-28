import React from 'react';
import { Box, Toolbar } from '@mui/material';

import { drawerWidth } from '../../config/constants';

const Main: React.FC = ({children}) => {
    return (
        <Box
            component="main"
            sx={{ 
                flexGrow: 1, 
                p: 2, 
                width: { sm: `calc(100% - ${drawerWidth}px)` }, 
                height:  `calc(100vh - ${56}px)`,
                marginLeft: 'auto',
                backgroundColor: '#fff'
            }}
        >
            <Toolbar />
            {children}
        </Box>
    );
}

export default Main;