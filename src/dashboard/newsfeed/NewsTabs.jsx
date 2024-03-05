import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function NewsTabs(props) {
  const { category, setCategory, categories} = props

  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={category}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {
          categories.map((cate, index) => 
            <Tab label={cate} key={index} value={cate} />
          )
        }
      </Tabs>
    </Box>
  );
}