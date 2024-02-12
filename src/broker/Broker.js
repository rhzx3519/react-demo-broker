import React, { Fragment } from "react"
import Container from "@mui/material/Container";
import Header from "./Header";
import { Box } from "@mui/system";
import Body from "./Body";

export default function Broker() {
    return <Fragment>
        <Header />
        <Container maxWidth='lg' sx={{
            height: '120vh'
        }}>
            <Body />
        </Container>
    </Fragment>
}