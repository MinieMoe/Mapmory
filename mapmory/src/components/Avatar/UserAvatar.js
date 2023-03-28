import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { googleLogout } from '@react-oauth/google';


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
        googleLogout();//do i need this??
        fetch('http://localhost:4000/api/logout', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success'){
                    console.log(data.message)
                }else{
                    console.error(data.message)
                }
            })
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
