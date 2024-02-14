import React, { Fragment } from "react"
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import Box from "@mui/material/Box";
import { Avatar, styled } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Wallet } from "@mui/icons-material";
import LeftDocker from "./LeftDocker";
import MiddleContent from "./MiddleContent";

function AssetsTable() {

}

export default function Body(props) {
    const { user, setUser } = props

    return <Box sx={{
        display: 'flex',
        '& > *': {
            flex: 1
        }
    }}>
        <Box sx={{ height: 610, mr: 1, mt: 2, border: 1, borderRadius: 1, borderColor: '#eee'  }}>
            <LeftDocker user={user} setUser={setUser} />
        </Box>
        <Box sx={{ flex: 5, height: 1500 }}>
            {/*<AssetsTable />*/}
            <MiddleContent user={user}/>
        </Box>
        <Box sx={{ height: 500, backgroundColor: '#eee', ml: 1, mt: 2 }}></Box>
    </Box>
}