import React, { Fragment } from "react"
import Container from "@mui/material/Container";
import Header from "./Header";
import { Box } from "@mui/system";
import Body from "./Body";

export default function Broker(props) {
    const { user, setUser } = props

    return <Fragment>
        <Header user={user} setUser={setUser} />
        <Container maxWidth='lg' sx={{
            height: '120vh'
        }}>
            <Body user={user} setUser={setUser} />
        </Container>
    </Fragment>
}