import { Avatar, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import React from "react";

const LeftInnerBlock = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

const LeftInnerTypo = styled(Typography)(({theme}) => ({
    variant: "body1",
    component: 'section',
    display: 'inline',
    fontSize: '0.8rem',
    opacity: '1.0',
}));

// <Divider sx={{ bgcolor: '#eee', opacity: 0.5 }} variant="middle" flexItem/>
const LeftInnerDivider = styled(Divider)(({theme}) => ({
    bgcolor: '#eee',
    opacity: 0.5,
    variant: 'middle',
    flexItem: true,
}));

export default function LeftDocker() {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
        }}>
            <Avatar
                sx={{ width: 60, height: 60 }}
                src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Typography
                variant="body1"
                noWrap={true}
                component="section"
                sx={{ flexGrow: 0, fontSize: '0.9rem', m: 1  }}
            >
                Anonymous
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', m: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                    <Typography
                        variant="h6"
                        noWrap={true}
                        component="section"
                        sx={{ flexGrow: 0, fontSize: '0.8rem'  }}
                        // display="inline"
                    >
                        0
                    </Typography>
                    <Typography
                        variant="body1"
                        noWrap={true}
                        component="section"
                        sx={{ flexGrow: 0, fontSize: '0.8rem', opacity: '0.6'  }}
                        // display="inline"
                    >
                        Following
                    </Typography>
                </Box>
                <Divider sx={{ bgcolor: '#eee'  }} variant="middle" orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                    <Typography
                        variant="h6"
                        noWrap={true}
                        component="section"
                        sx={{ flexGrow: 0, fontSize: '0.8rem' }}
                        // display="inline"
                    >
                        0
                    </Typography>
                    <Typography
                        variant="body1"
                        noWrap={true}
                        component="section"
                        sx={{ flexGrow: 0, fontSize: '0.8rem', opacity: '0.6'  }}
                    >
                        Follower
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Divider sx={{ bgcolor: '#eee'  }} flexItem/>
        {/* 1 end */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 1 }}>
            <LeftInnerBlock>
                <HomeOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Home Page</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <ForumOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }} />
                <LeftInnerTypo>Discussion</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <StarBorderOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }} />
                <LeftInnerTypo>Collect</LeftInnerTypo>
            </LeftInnerBlock>
        </Box>
        {/* 2 end */}
        <Divider sx={{ bgcolor: '#eee', opacity: 0.5 }} variant="middle" flexItem/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 1 }}>
            <LeftInnerBlock>
                <ThumbUpAltOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Likes</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <CommentOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Comments</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <ChatBubbleOutlineOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Chats</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <MarkEmailUnreadOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Received</LeftInnerTypo>
            </LeftInnerBlock>
        </Box>
        {/* 3 end */}
        <Divider sx={{ bgcolor: '#eee', opacity: 0.5 }} variant="middle" flexItem/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 1 }}>
            <LeftInnerBlock>
                <EditNoteOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>My column</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <AccountBalanceWalletOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>My Wallet</LeftInnerTypo>
            </LeftInnerBlock>
        </Box>
        {/*4 end*/}
        <Divider sx={{ bgcolor: '#eee', opacity: 0.5 }} variant="middle" flexItem/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 1 }}>
            <LeftInnerBlock>
                <WarningAmberOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Received</LeftInnerTypo>
            </LeftInnerBlock>
        </Box>
        {/*5 end*/}
        <Divider sx={{ bgcolor: '#eee', opacity: 0.5 }} variant="middle" flexItem/>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 1 }}>
            <LeftInnerBlock>
                <SportsBaseballOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>In regard to Snowball</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <MapOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Finance navigator</LeftInnerTypo>
            </LeftInnerBlock>
            <LeftInnerBlock>
                <TipsAndUpdatesOutlinedIcon fontSize='medium' sx={{ ml: 2, mr: 1 }}/>
                <LeftInnerTypo>Tips</LeftInnerTypo>
            </LeftInnerBlock>
        </Box>
    </Box>
}

