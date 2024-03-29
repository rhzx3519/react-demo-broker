import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import cities from "./data/data.json";
import Card from "./components/Card";
import SearchAppBar from "./components/AppBar";
import Link from "@mui/material/Link";
import Header from "../broker/Header";

export default function Home(props) {
    const { user, setUser } = props
  return (
      <>
          <Header user={user} setUser={setUser} />
          <Container maxWidth='lg'>
        {cities.map((city) => (
          <>
              <Link href={city.redirect} underline="none">
            <Typography
                variant="h2"
              component="h2"
              marginBottom={3}
              marginTop={5}
            >
              {city.name}
            </Typography>
              </Link>
            <Grid container spacing={5}>
              {city.tours.map((tour) => (
                <Card tour={tour} />
              ))}
            </Grid>
          </>
        ))}
      </Container>
      </>
  );
}
