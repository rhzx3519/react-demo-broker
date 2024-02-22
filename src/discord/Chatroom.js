import React from "react";
import { Box, useTheme } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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

const MessageArea = function () {
    return     <Box sx={{ width: '100%', height: '90%', backgroundColor: 'blue' }}>
        <Stack spacing={2}>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
        </Stack>
    </Box>
}

const Input = function (placeholder) {
    return <Box>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder={placeholder} />
    </Box>
}


const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
}));

export default function Chatroom() {
    return <Box sx={{ backgroundColor: 'green', height: '100vh' }}>
        <TopBar />
        <MessageArea />
        <Input placeholder={''} />
    </Box>
};