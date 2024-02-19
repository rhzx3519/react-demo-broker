import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Add from "./Add";
import { useState } from "react";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Rightbar from "./Rightbar";

export default function Facebook() {
    const [mode, setMode] = useState("light");

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Sidebar setMode={setMode} mode={mode}/>
                    <Feed />
                    <Rightbar />
                </Stack>
                <Add />
            </Box>
        </ThemeProvider>
    );
}