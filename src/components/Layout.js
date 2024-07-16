import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, InputBase, Badge, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AccountCircle, MoreVert, Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { getIncompleteUsers } from '../services/userServices'; // Import your API call
import './Layout.css'; // Assuming additional styles are added in Layout.css

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notifications on component mount
    const fetchNotifications = async () => {
      const data = await getIncompleteUsers(); // Fetch incomplete user setup data
      setNotifications(data);
      setNotificationCount(data.length);
    };
    fetchNotifications();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleDropdownMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleDropdownMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <div className="layout">
      <header className="header">
        <AppBar position="static" className="app-bar">
          <Toolbar>
            <Typography variant="h6" component={RouterLink} to="/" className="logo" sx={{ paddingLeft: 2 }}>
              MY APP
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box ml={2}>
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge badgeContent={notificationCount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List
                  subheader={<ListSubheader>Notifications</ListSubheader>}
                >
                  {notifications.map((notification, index) => (
                    <ListItem
                      button
                      key={index}
                      component={RouterLink}
                      to="/user-setup" // Adjust as needed for your routing
                    >
                      <ListItemText primary={`User ${notification.standard_id} needs setup`} />
                    </ListItem>
                  ))}
                </List>
              </Menu>
              <IconButton onClick={handleDropdownMenuOpen} color="inherit">
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleDropdownMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleDropdownMenuClose}>Profile</MenuItem>
                <MenuItem component={RouterLink} to="/onboarding" onClick={handleDropdownMenuClose}>Onboarding</MenuItem>
                <MenuItem component={RouterLink} to="/services" onClick={handleDropdownMenuClose}>Services</MenuItem>
                <MenuItem component={RouterLink} to="/quick-links" onClick={handleDropdownMenuClose}>Quick Links</MenuItem>
                <MenuItem component={RouterLink} to="/user-setup" onClick={handleDropdownMenuClose}>User Setup</MenuItem>
                <MenuItem component={RouterLink} to="/onboarding-trend" onClick={handleDropdownMenuClose}>Onboarding Trend</MenuItem>
                <MenuItem component={RouterLink} to="/traffic-trend" onClick={handleDropdownMenuClose}>Traffic Trend</MenuItem>
                <MenuItem component={RouterLink} to="/dashboard" onClick={handleDropdownMenuClose}>Dashboard</MenuItem>
              </Menu>

              <IconButton onClick={handleMenuOpen} color="inherit">
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <Box py={3} textAlign="center">
          <Typography variant="body1">Footer Content</Typography>
        </Box>
      </footer>
    </div>
  );
};

export default Layout;
