import React from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import { MdMoreHoriz } from "react-icons/md";
import { IconContext } from "react-icons";
import Divider from '@mui/material/Divider';

const TitleWrapper = styled.span`
  font-size: 1.5rem;
  color: #dbe7fc;
`;

const DateWrapper = styled.div`
  font-size: 1.2rem;
  color: #696969;
  text-align: left;
`;

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const NewsCard = ({ article }) => {

  return (
    <Grid container spacing={3}>
        <Grid item xs={8} md={8} lg={9}>
          <div style={{ backgroundColor: '#696969', width: '100px', textAlign: 'center', color: '#dbe7fc' }}>{article.source?.name}</div>
          <TitleWrapper>{article.title}</TitleWrapper>
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <img  style={{ width: '100%', height: '100%', maxHeight: '100%', maxWidth: '100%' }} src={article.urlToImage} alt="/" />
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <DateWrapper>
            {new Date(article.publishedAt).toLocaleDateString("en-US", options)}
          </DateWrapper>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <div style={{ textAlign: 'right' }}>
          <IconContext.Provider
            value={{
              color: "#696969",
              className: "global-class-name",
              size: "2.0rem"
            }}>
            <MdMoreHoriz />
          </IconContext.Provider>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ mb: 4 }} >
          <Divider sx={{ backgroundColor: 'white'}}/>
        </Grid>
    </Grid>
  );
};

export default NewsCard;