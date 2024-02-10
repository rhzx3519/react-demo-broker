import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import {
  createTheme,
  Grid,
  Paper,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import  "./Card.css"
import Link from "@mui/material/Link";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "body3",
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
});

export default function Card({ tour }) {
  console.log()

  return (
    <Grid item xs={4} md={3}>
      <ThemeProvider theme={theme}>
        <Paper elevation={4} className="paper">
          <img src={process.env.REACT_APP_STATIC_SERVER_URL + tour.image} alt="" className="img" />
          <Box
            sx={{
              paddingX: 1,
            }}
          >
            <Typography variant="h6" component="h2">
              {tour.name}
            </Typography>
            <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
            >
              <CategoryIcon style={{ width: 12.5 }}/>
              <Typography variant="body2" component="p" marginLeft={0.5}>
                {tour.category}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <WorkOutlineIcon style={{ width: 12.5 }} sx={{ mt: -0.5 }}/>
              <Typography variant="body2" component="p" marginLeft={0.5}>
                {tour.intro}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              marginTop={0}
            >
              <LinkIcon style={{ width: 12.5 }} sx={{ mt: 0 }} />
              <Link href={tour.link} underline="hover">
                <Typography variant="body2" component="p" marginLeft={0.5}>
                  {'Official page'}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
}
