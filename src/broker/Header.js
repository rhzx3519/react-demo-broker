import React, { Fragment } from "react"
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

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "25px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function Header() {
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
                <Box sx={{
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
                        Anonymous
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    </Fragment>
}