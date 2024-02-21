import React, { useEffect } from "react";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const ServerBtn = styled('Button')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    variant: 'text',
}));

export default function Server(props) {
    // const [servers, setServers] = useState([]);
    // useEffect(() => {
    //
    // }, [servers]);

    const { servers } = props
    return <Box sx={{ backgroundColor: 'blue', height: '100vh' }}>
        <Stack direction="column" spacing={2}>
           (servers.foreach(s => {
            <ServerBtn>s</ServerBtn>
        })
        </Stack>
    </Box>
};