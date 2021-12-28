import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { MobileContext } from '../../context/MobileContext';

const Headbar: React.FC = () => {
    const { handleDrawerToggle } = useContext(MobileContext);

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar >
            
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div" style={{fontWeight: 'bolder'}}> 
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 12,
                        height: 12,
                        backgroundColor: '#6EB2FF',
                        transform: 'rotate(35deg)'
                    }, 
                }}>
                    <Paper variant="outlined" square/> SQUARE JUDGE
                </Box>
            </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default Headbar;