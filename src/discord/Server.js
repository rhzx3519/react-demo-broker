import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { findServers } from "../API/ChatAPI";

const ServerBtn = styled('Button')(({ theme }) => ({
    variant: 'text',
}));

export default function Server(props) {
    const [servers, setServers] = useState([]);

    const callAPI = async () => {
        const serverList = await findServers()
        setServers(serverList || [])
    }
    useEffect(() => {
        callAPI()
    }, [])

    return <Box sx={{ backgroundColor: 'blue', height: '100vh' }}>
        <Stack direction="column" spacing={2}>
            {servers.map(s =>
                <ServerBtn>s.name</ServerBtn>
            )}
        </Stack>
    </Box>
};