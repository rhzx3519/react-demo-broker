import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const tabData = [
    {   key: 0,
        title: 'MUI',
    },
    {
        key: 1,
        title: 'System Design',
    },
    {
        key: 2,
        title: 'Broker',
    }
]

export default function TopBar(props) {
    const { user, setUser, tabIndex, setTabIndex } = props
    const [ open, setOpen ] = useState(false);

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <AppBar position='sticky'>
                <Toolbar sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <Tabs
                            value={tabIndex}
                            onChange={(e, newTabIndex) => {
                                setTabIndex(newTabIndex)
                            }}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            {
                                tabData.map((data) => (
                                    <Tab value={data.key} label={data.title}></Tab>
                                ))
                            }
                        </Tabs>
                    </Box>
                    <Box>
                        {!user &&
                            <AccountCircle onClick={(e) => setOpen(true)}/>
                       }
                        {user && <Avatar
                            sx={{ width: 40, height: 40 }}
                            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            onClick={(e) => setOpen(true)}
                        />}
                    </Box>

                </Toolbar>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}
                    onClose={(e) => setOpen(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    {user && (
                        <React.Fragment>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem onClick={e => {
                            if (user) {
                                localStorage.removeItem('user')
                                setUser(null)
                            }
                        }}>Sign out</MenuItem>
                        </React.Fragment>
                    )}
                    {!user && <MenuItem onClick={event => {navigate('/signin')}}>Sign in</MenuItem>}
                </Menu>
            </AppBar>
        </React.Fragment>
    );
}