import React from "react";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import Server from "./Server";
import Chatroom from "./Chatroom";
import Group from "./Group";
import "./Discord.css";

export default function Discord(props) {
    const { user, setUser } = props
    return (
        <Container maxWidth='lg' sx={{ height: '100vh', backgroundColor: 'yellow' }}>
            <Box sx={{
                display: 'flex',
                "& > *" : {
                    flex: 1,
                    flexGrow: 1,
                    mx: 0.5,
                }
            }}>
                <Box sx={{ flex: 1 }}>
                    <Server />
                </Box>
                <Box sx={{ flex: 2 }}>
                    <Group />
                </Box>
                <Box sx={{ flex: 10 }}>
                    <Chatroom />
                </Box>
            </Box>
        </Container>
    )
};