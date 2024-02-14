import React from "react";
import { Box } from "@mui/system";
import AssetsTable from "./AssetsTable";

export default function MiddleContent(props) {
    const { user } = props
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        mr: 3,
        ml: 3,
    }}>
        <AssetsTable user={user}/>
    </Box>
}