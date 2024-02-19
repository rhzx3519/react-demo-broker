import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Fade, ListItemIcon, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const tabData = [
    {   key: 0,
        title: 'mui',
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const onCLickSignOut = (e) => {
        if (user) {
            localStorage.removeItem('user')
            setUser(null)
        }
        setAnchorEl(null)
    }

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
                    {user && <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                        '& > *': {
                            margin: 3
                        }
                    }}> {/* Right */}
                        <NotificationsNoneIcon fontSize='medium' />
                        <Divider sx={{ bgcolor: '#eee'  }} variant="middle" orientation="vertical" flexItem />
                        <PersonIcon fontSize='medium' />
                        <Typography
                            variant="body1"
                            noWrap={true}
                            component="section"
                            sx={{ flexGrow: 0, fontSize: '0.9rem'  }}
                            display="inline"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            {user?.nickname}
                        </Typography>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            TransitionComponent={Fade}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => setAnchorEl(null)}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={onCLickSignOut}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Sign Out
                            </MenuItem>
                        </Menu>
                    </Box>}
                    {!user && <Box sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                        '& > *': {
                            margin: 3
                        }}}>
                        <HeadsetMicIcon fontSize='medium'/>
                        <Button
                            component="label"
                            role={undefined}
                            color="inherit"
                            tabIndex={-1}
                            variant="outlined"
                            startIcon={<PersonIcon />}
                            sx={{
                                borderRadius: 6,
                                width: 150,
                            }}
                            onClick={(e) => navigate('/signin')}
                        >
                            Sign In/Up
                        </Button>
                    </Box>}
                </Toolbar>

            </AppBar>
        </React.Fragment>
    );
}