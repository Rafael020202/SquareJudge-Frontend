import React, { useContext } from 'react';
import Link from 'next/link';
import { Box, Drawer, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { MobileContext } from '../../context/MobileContext';
import { drawerWidth, routes } from '../../config/constants';




interface Props {
  window?: () => Window;
}


const Sidebar: React.FC<Props> = (props) => {
    const { handleDrawerToggle, mobileOpen } = useContext(MobileContext);
    const { window } = props;

    const drawer = (
        <div >
          <Toolbar />
          <Divider />
          <List>
            {routes.map( (route, index) => (
              <Link href={`${route.url}`} key={index}>
                <ListItem button >
                  <ListItemIcon>
                    {<route.icon/>}
                  </ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >

            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>

    );
}

export default Sidebar;