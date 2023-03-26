import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

const userName = 'fakeUser'
const UserAvatar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        //TD: removing user Id token from localStorage
        // check for user authentication
    }

    return (
        <div>
            <Tooltip title='Account settings'>
                <IconButton 
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'user-avatar' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>{userName[0]}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id='user-avatar'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            
        
        </div>
    );
}

export default UserAvatar;
