// src/pages/QuickLink.js
import React from 'react';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const QuickLink = () => {
  const links = [
    { title: 'Cloud Access', icon: <CloudIcon style={{ fontSize: 100 }} />, link: '#' },
    { title: 'Storage Access', icon: <StorageIcon style={{ fontSize: 100 }} />, link: '#' },
    { title: 'Security Access', icon: <SecurityIcon style={{ fontSize: 100 }} />, link: '#' },
    { title: 'User Profile', icon: <AccountCircleIcon style={{ fontSize: 100 }} />, link: '#' },
  ];

  return (
    <Box mt={4} display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={10} sx={{ padding: 4, width: '80%', height: '80%' }}>
        <Grid container spacing={4} justifyContent="center">
          {links.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={5} sx={{ padding: 2, textAlign: 'center' }}>
                <Button href={item.link} sx={{ width: '100%', height: '100%', padding: 4 }}>
                  {item.icon}
                </Button>
                <Typography variant="h6" align="center" mt={2}>
                  {item.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default QuickLink;
