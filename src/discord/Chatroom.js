import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Avatar, InputAdornment, InputBase } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from "@mui/icons-material/Search";
import { convertLength } from "@mui/material/styles/cssUtils";
import SendIcon from '@mui/icons-material/Send';
import useWebSocket, { ReadyState } from "react-use-websocket"


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

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Record = function (props) {
    const { src, log, timestamp } = props
    return <Box sx={{
        p: 1,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }}>
        <Avatar {...stringAvatar('Kent Dodds')}/>
        <Box>
            <Typography
                variant='subtitle2'
                color='white'
                sx={{ ml: 2 }}
            >
                {new Date(timestamp).toLocaleDateString()}
            </Typography>
            <Typography
                variant='body1'
                display="inline"
                sx={{ ml: 2 }}
                color='white'
            >
                {log}
            </Typography>
        </Box>
    </Box>
}

const MessageArea = function (props) {
    const { chats, scrollRef } = props

    return   <Box sx={{ width: '100%', height: '87%', backgroundColor: '#25262b', my: 0.5 }}>
        <Stack spacing={2} style={{maxHeight: "100%", overflow: 'auto'}}>
            {chats.map(log => (
                <Record
                    log={log}
                    src={'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                    timestamp={Date.now()}
                />
            ))}
            <Box ref={scrollRef} />
        </Stack>
    </Box>
}

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

    const handleSendCLick = (e) => {
        const inputEle = document.getElementById('input')
        const msg = inputEle.value.trim()
        if (msg === '') {
            return
        }
        inputEle.value = ''

        setChats([
            ...chats,
            msg,
        ])
    }


    return <Box sx={{
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: "10px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5.5%',
        m: 2,
    }}>
            <AddCircleOutlineIcon style={{ cursor: 'pointer' }} fontSize='medium' sx={{
                color: 'black',
                mr: 1,
            }} onClick={(e) => {console.log('click add...')}} />
            <InputBase id='input' placeholder="Just chat..." sx={{
                flexGrow: 1,
                width: "100%",
            }} onKeyDown={handleInput} />
            <SendIcon style={{ cursor: 'pointer' }} fontSize='medium' onClick={handleSendCLick} />
        </Box>
}



export default function Chatroom() {
    const [chats, setChats] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [chats]);


    const localUser = JSON.parse(localStorage.getItem("user"))
    const token = localUser?.token
    const WS_URL = `${process.env.REACT_APP_CHAT_WEBSOCKET_URL}/v1/ws/chat`
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )


    // Run when the connection state (readyState) changes
    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                event: "subscribe",
                data: {
                    channel: "general-chatroom",
                },
            })
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        console.log(`Got a new message: ${lastJsonMessage}`)
    }, [lastJsonMessage])


    return <Box sx={{ backgroundColor: 'green', height: '100vh', padding: 1,
        "& > *" : {}
    }}>
        <TopBar />
        <MessageArea chats={chats} scrollRef={scrollRef} />
        <InputArea chats={chats} setChats={setChats} />
    </Box>
};