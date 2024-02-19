import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

function Header(props) {
    const { sections, title } = props;

    return (
        <React.Fragment>
            <Toolbar sx={{
                borderBottom: 1,
                borderColor: 'divider',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: 'blue',
                flexGrow: 1,
            }}>
                <Button variant="contained" size="small" sx={{flexGrow: 0}}>Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ }}
                >
                    {title}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" sx={{  }}>
                    Sign up
                </Button>
                </Box>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;