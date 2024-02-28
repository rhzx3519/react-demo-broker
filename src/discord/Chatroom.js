import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Avatar, InputAdornment, InputBase } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
    const { msg, user } = props

    const StyledBox = styled(Box)(({ }) => ({
        p: 1,
        borderRadius: 4,
        display: 'flex',
        flexDirection: msg.from?.email === user.email ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }));

    return <StyledBox>
        <Avatar {...stringAvatar(`${msg.from.fullname}`)}/>
        <Box>
            <Typography
                variant='subtitle2'
                color='white'
                sx={{ ml: 2 }}
            >
                {new Date(msg.created_at*1000).toLocaleString()}
            </Typography>
            <Typography
                variant='body1'
                display="inline"
                sx={{ ml: 2 }}
                color='white'
            >
                {msg.content}
            </Typography>
        </Box>
    </StyledBox>
}

const MessageArea = function (props) {
    const { messageHistory, scrollRef, user } = props


    return   <Box sx={{ width: '100%', height: '87%', backgroundColor: '#25262b', my: 0.5 }}>
        <Stack spacing={2} style={{maxHeight: "100%", overflow: 'auto'}}>
            {messageHistory.map(msg => (
                <Record msg={msg} user={user}/>
            ))}
            <Box ref={scrollRef} />
        </Stack>
    </Box>
}

const InputArea = function (props) {
    const { messageHistory, setChats, sendJsonMessage } = props

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const msg = e.target.value.trim()
            if (msg === '') {
                return
            }
            e.target.value = ''

            sendJsonMessage(msg)
        }
    }

    const handleSendCLick = (e) => {
        const inputEle = document.getElementById('input')
        const msg = inputEle.value.trim()
        if (msg === '') {
            return
        }
        inputEle.value = ''

        sendJsonMessage(msg)
    }

    return <Box sx={{
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: "10px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5.5%',
        m: 1,
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



export default function Chatroom(props) {
    const { user } = props
    const [messageHistory, setMessageHistory] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messageHistory]);


    const localUser = JSON.parse(localStorage.getItem("user"))
    const token = localUser?.token
    const WS_URL = `wss://${window.location.hostname}${process.env.REACT_APP_CHAT_WEBSOCKET_PATH}/v1/ws/chat`
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
            // sendJsonMessage()
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        if (lastJsonMessage == null || lastJsonMessage == "") {
            return
        }
        if (lastJsonMessage?.msg_code == 1) {
            setMessageHistory(messageHistory => [
                ...messageHistory,
                lastJsonMessage,
            ])
        }
    }, [lastJsonMessage])


    return <Box sx={{ backgroundColor: '#25262b', height: '100vh', padding: 1,
        "& > *" : {}
    }}>
        <TopBar />
        <MessageArea messageHistory={messageHistory} scrollRef={scrollRef} user={user}/>
        <InputArea messageHistory={messageHistory} setChats={setMessageHistory} sendJsonMessage={sendJsonMessage} />
    </Box>
};