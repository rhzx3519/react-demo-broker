import TopBar from "./TopBar";
import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Toolbar from '@mui/material/Toolbar';
import CardList from "./CardList";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableViews from 'react-swipeable-views';
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Verify } from "../../API/AuthAPI";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



export default function Gallery(props) {
    const theme = useTheme();
    const [ tabIndex, setTabIndex ] = useState(0);

    const { user, setUser } = props
    const navigate = useNavigate()
    useEffect(() => {
        // Fetch the user email and token from local storage
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (!localUser || !localUser.token) {
            setUser(null)
            return
        }

        (async function(){
            const status= await Verify(localUser.token)
            if (status === 200) {
                setUser(localUser)
                return
            }
        })()

    }, [])


    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabIndex(index);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <TopBar user={user} setUser={setUser} tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <Toolbar /> {/* To avoid to cover the following content*/}
            <main>
                <Container maxWidth='md' sx={{ backgroundColor: 'yellow', height: '120vh' }}>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={tabIndex}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                            {/*Item One*/}
                            <CardList />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2} dir={theme.direction}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                </Container>
            </main>
        </React.Fragment>
    );
}