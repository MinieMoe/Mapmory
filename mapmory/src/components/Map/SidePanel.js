//SidePanel.js includes SearchBar.js and Avatar.js
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, AppBar, Toolbar, Typography, Stack } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'
import CollectionsIcon from '@mui/icons-material/Collections';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { bgcolor } from '@mui/system';
import SearchBar from '../SearchBar/SearchBar';
import UserAvatar from '../Avatar/UserAvatar';

const SidePanel = () => {
    const [open, setOpen] = useState(false)

    const SidePanelList = () => (
        <Box
            sx={{ w: 250 }}
            role="presentation"
        >
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <CollectionsIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Photo'/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div>
            {/* Top Nav Bar */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon onClick={() => setOpen(true)}/>
                    </IconButton>

                    {/* TD: passsing function here to keep track of changes to search input??*/}
                    <SearchBar />
                    <Box sx={{flexGrow: 1}}/>
                    <UserAvatar />
               
                    </Toolbar>
                </AppBar>
            </Box>

            {/* SidePanel */}
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
            >
                <SidePanelList />
            </Drawer>
            
        </div>
    )
}

export default SidePanel;
