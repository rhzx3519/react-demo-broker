import React from "react";
import { Box } from "@mui/system";
import AssetsTable from "./AssetsTable";

export default function MiddleContent() {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        mr: 3,
        ml: 3,
    }}>
        <AssetsTable />
    </Box>
}