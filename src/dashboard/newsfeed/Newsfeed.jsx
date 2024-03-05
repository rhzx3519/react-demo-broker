import { useState } from "react";
import NewsTabs from "./NewsTabs";
import NewsCard from "./NewsCard";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import useFetchNews from "../hooks/useFetchNews";
import LoaderWrapper from '../common/LoaderWrapper';

const categories = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ]
const DEFAULT_CATEGORY = 'business'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Newsfeed = () => {
  const [ category, setCategory ] = useState(DEFAULT_CATEGORY);

  const { data, loading } = useFetchNews({ category });

  return (
    <>
    {loading ? (<LoaderWrapper />) : 
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <NewsTabs category={category} setCategory={setCategory}
              categories={categories} defaultCategory={DEFAULT_CATEGORY} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, overflow: 'auto' }}>
          {data?.articles.map((article, index) => (
            <NewsCard article={article} key={index}/>
          ))}
        </Container>
      </ThemeProvider>
    }
  </>
  );
};

export default Newsfeed;
