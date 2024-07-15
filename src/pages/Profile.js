// src/pages/Profile.js
import React from 'react';
import { Typography, Paper, Grid, Box, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SectionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#ffffff',
}));

const UserInfoContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#1AAE88',
  color: 'white',
  textAlign: 'center',
}));

const Profile = () => {
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={10}>
          <UserInfoContainer elevation={3}>
            <Avatar sx={{ bgcolor: 'white', color: '#1AAE88', width: 100, height: 100, margin: 'auto' }}>
              <AccountCircleIcon sx={{ fontSize: 80 }} />
            </Avatar>
            <Typography variant="h5" mt={2}>
              John Doe
            </Typography>
            <Typography variant="body1" color="inherit">
              john.doe@example.com
            </Typography>
            <Typography variant="body2" color="inherit" mt={2}>
              Title: Senior Data Scientist
            </Typography>
          </UserInfoContainer>
        </Grid>

        <Grid item xs={12} md={5}>
          <SectionContainer elevation={3}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Divider />
            <List>
              <ListItem>
                <ListItemText primary="Access List" secondary="Enabled" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Databases" secondary="5 Databases Connected" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Storage Buckets" secondary="3 Buckets Available" />
              </ListItem>
            </List>
          </SectionContainer>
        </Grid>

        <Grid item xs={12} md={5}>
          <SectionContainer elevation={3}>
            <Typography variant="h6" gutterBottom>
              Jupyter Config
            </Typography>
            <Divider />
            <List>
              <ListItem>
                <ListItemText primary="Memory" secondary="16 GB" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Custom Profile" secondary="Enabled" />
              </ListItem>
            </List>
          </SectionContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
