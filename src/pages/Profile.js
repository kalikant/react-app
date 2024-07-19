// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, Box, Divider, Avatar, TextField, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [configData, setConfigData] = useState({
    jupyter: {
      memory: '16 GB',
      cores: '4',
      version: '1.2.3',
    },
    database: {
      type: 'PostgreSQL',
      host: 'localhost',
      port: 5432,
    },
    s3: {
      bucket: 'my-bucket',
      region: 'us-west-1',
    },
    access: {
      roles: ['admin', 'user'],
      permissions: ['read', 'write'],
    },
    kernel: {
      python: '3.8.5',
      tensorflow: '2.3.0',
    },
    vault: {
      token: 's.1234567890abcdef',
      policies: ['default', 'admin'],
    }
  });

  const handleSearch = async () => {
    // Fetch profile data and config data using the searchTerm
    // For demonstration, setting dummy data directly
    setProfileData({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      title: 'Senior Data Scientist',
      avatar: null, // URL to avatar image if available
      personalDetails: {
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const renderConfigContent = (config) => {
    return Object.entries(config).map(([key, value]) => (
      <Typography key={key} variant="body2">
        {`${key}: ${value}`}
      </Typography>
    ));
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            placeholder="Search by email id or standard id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearch}>
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UserInfoContainer elevation={3}>
            {profileData ? (
              <Box>
                <Avatar src={profileData.avatar} sx={{ width: 100, height: 100, margin: 'auto' }}>
                  <AccountCircleIcon sx={{ fontSize: 80 }} />
                </Avatar>
                <Typography variant="h6" mt={2}>
                  Profile Information
                </Typography>
                <Divider />
                <Typography variant="body2" color="inherit" mt={2}>
                  <strong>Name: </strong> {profileData.name}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <strong>Email: </strong> {profileData.email}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <strong>Title: </strong> {profileData.title}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <strong>Phone: </strong> {profileData.personalDetails.phone}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <strong>Address: </strong> {profileData.personalDetails.address}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Avatar sx={{ bgcolor: 'white', color: '#1AAE88', width: 100, height: 100, margin: 'auto' }}>
                  <AccountCircleIcon sx={{ fontSize: 80 }} />
                </Avatar>
                <Typography variant="h5" mt={2}>
                  No Data
                </Typography>
              </Box>
            )}
          </UserInfoContainer>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Jupyter Config
                </Typography>
                <Divider />
                {renderConfigContent(configData.jupyter)}
              </SectionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Database Config
                </Typography>
                <Divider />
                {renderConfigContent(configData.database)}
              </SectionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  S3 Configs
                </Typography>
                <Divider />
                {renderConfigContent(configData.s3)}
              </SectionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Access List
                </Typography>
                <Divider />
                {renderConfigContent(configData.access)}
              </SectionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Kernel Access
                </Typography>
                <Divider />
                {renderConfigContent(configData.kernel)}
              </SectionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <SectionContainer elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Vault Config
                </Typography>
                <Divider />
                {renderConfigContent(configData.vault)}
              </SectionContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
