import React, { Fragment, useEffect } from "react"
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import Divider from "@mui/material/Divider";
import { InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { Verify } from "../API/AuthAPI";

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "25px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function Header(props) {
    const { user, setUser } = props
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch the user email and token from local storage
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (!localUser || !localUser.token) {
            setUser(null)
            return
        }

        (async function(){
            const status= await Verify(localUser.token)
            if (status === 200) {
                setUser(localUser)
                return
            }
        })()
    }, [])

    return <Fragment>
        <AppBar position="sticky" sx={{  backgroundColor: '#3167b9' }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& > *': {
                    flex: 1,
                    // backgroundColor: 'red',
                    flexGrow: 1,
                    height: 55
                }
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap' }}> {/* Left */}
                    <AcUnitIcon fontSize='medium' sx={{  }}/>
                    <Typography
                        variant="body1"
                        noWrap={true}
                        component="section"
                        sx={{ flexGrow: 0, fontSize: '1.2rem', mr: 8 }}
                        display="inline"

                    >
                        XUEQIU
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 2 }}> {/* Middle */}
                    <Search>
                        <InputBase placeholder="search..." sx={{
                            width: 200,
                        }} />
                        <SearchIcon style={{ cursor: 'pointer' }} fontSize='medium' sx={{
                            color: 'black',
                        }} onClick={(e) => {console.log('click search')}} />
                    </Search>
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
                    >
                        {user?.nickname}
                    </Typography>
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
    </Fragment>
}