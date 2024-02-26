import React from "react";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import Server from "./Server";
import Chatroom from "./Chatroom";
import Group from "./Group";
import "./Discord.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#25262b',
        },
        secondary: {
            main: '#edf2ff',
        },
    },
});

export default function Discord(props) {
    const { user, setUser } = props
    return (
        <ThemeProvider theme={darkTheme}>
        <Container maxWidth='lg' sx={{ height: '100vh' }}>
            <Box sx={{
                display: 'flex',
                "& > *" : {
                    flex: 1,
                    flexGrow: 1,
                    mx: 0.05,
                }
            }}>
                <Box sx={{ flex: 1 }}>
                    <Server />
                </Box>
                <Box sx={{ flex: 2 }}>
                    <Group />
                </Box>
                <Box sx={{ flex: 10 }}>
                    <Chatroom user={user} />
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
    )
};