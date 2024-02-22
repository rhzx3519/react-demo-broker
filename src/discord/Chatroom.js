import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment, InputBase } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from "@mui/icons-material/Search";
import { convertLength } from "@mui/material/styles/cssUtils";

const TopBar = function () {
    const theme = useTheme();

   return  <AppBar position="sticky" sx={{  backgroundColor: theme.palette.background.paper }}>
       <Toolbar variant="dense" sx={{
           display: 'flex',
           justifyContent: 'flex-start',
           alignItems: 'center',
           '& > *': {
               flex: 1,
               flexGrow: 1,
           }
       }}>
           <Typography
               variant="h6"
               noWrap={true}
               component="div"
               color={theme.palette.text.secondary}
           >
               #Channel1
           </Typography>
       </Toolbar>
   </AppBar>
}

const MessageArea = function (props) {
    const { chats, scrollRef } = props

    return   <Box sx={{ width: '100%', height: '87%', backgroundColor: 'blue', my: 1 }}>
        <Stack spacing={2} style={{maxHeight: "100%", overflow: 'auto'}}>
            {chats.map(chat => (
                  <Item>{chat}</Item>
            ))}
            <Item ref={scrollRef} />
        </Stack>
    </Box>
}

const InputDiv = styled(Box)(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "10px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5.5%',
    m: 2,
}));


const InputArea = function (props) {
    const { chats, setChats } = props

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const msg = e.target.value.trim()
            if (msg === '') {
                return
            }
            e.target.value = ''

            setChats([
                ...chats,
                msg,
            ])
        }
    }

    return <InputDiv>
            <AddCircleOutlineIcon style={{ cursor: 'pointer' }} fontSize='medium' sx={{
                color: 'black',
                mr: 1,
            }} onClick={(e) => {console.log('click add...')}} />
            <InputBase placeholder="Just chat..." sx={{
                flexGrow: 1,
                width: "100%",
            }} onKeyDown={handleInput} />
        </InputDiv>
}


const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
}));

export default function Chatroom() {
    const [chats, setChats] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [chats]);

    return <Box sx={{ backgroundColor: 'green', height: '100vh', padding: 1,
        "& > *" : {}
    }}>
        <TopBar />
        <MessageArea chats={chats} scrollRef={scrollRef} />
        <InputArea chats={chats} setChats={setChats} />
    </Box>
};