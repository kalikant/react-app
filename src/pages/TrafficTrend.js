// src/pages/Dashboard.js
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import BookingsIcon from '@mui/icons-material/CalendarToday';
import UsersIcon from '@mui/icons-material/People';
import RevenueIcon from '@mui/icons-material/AttachMoney';
import FollowersIcon from '@mui/icons-material/PersonAdd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'M', uv: 40 },
  { name: 'T', uv: 30 },
  { name: 'W', uv: 20 },
  { name: 'T', uv: 27 },
  { name: 'F', uv: 18 },
  { name: 'S', uv: 23 },
  { name: 'S', uv: 34 },
];

const lineData = [
  { name: 'Apr', uv: 400 },
  { name: 'May', uv: 300 },
  { name: 'Jun', uv: 200 },
  { name: 'Jul', uv: 278 },
  { name: 'Aug', uv: 189 },
  { name: 'Sep', uv: 239 },
  { name: 'Oct', uv: 349 },
  { name: 'Nov', uv: 430 },
  { name: 'Dec', uv: 400 },
];

const TrafficTrend = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Top row of statistics */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <BookingsIcon sx={{ fontSize: 50 }} />
            <Typography variant="h5">Bookings</Typography>
            <Typography variant="h4">281</Typography>
            <Typography variant="body2">+55% than last week</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <UsersIcon sx={{ fontSize: 50 }} />
            <Typography variant="h5">Today's Users</Typography>
            <Typography variant="h4">2,300</Typography>
            <Typography variant="body2">+3% than last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <RevenueIcon sx={{ fontSize: 50 }} />
            <Typography variant="h5">Revenue</Typography>
            <Typography variant="h4">34k</Typography>
            <Typography variant="body2">+1% than yesterday</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <FollowersIcon sx={{ fontSize: 50 }} />
            <Typography variant="h5">Followers</Typography>
            <Typography variant="h4">+91</Typography>
            <Typography variant="body2">Just updated</Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Website Views</Typography>
            <Typography variant="body2">Last Campaign Performance</Typography>
            <Typography variant="body2">Campaign sent 2 days ago</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Daily Sales</Typography>
            <Typography variant="body2">Increase in today sales</Typography>
            <Typography variant="body2">Updated 4 min ago</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Completed Tasks</Typography>
            <Typography variant="body2">Last Campaign Performance</Typography>
            <Typography variant="body2">Just updated</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Projects and Orders overview */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="body2">30 done this month</Typography>
            <Box mt={2}>
              <Typography variant="body2">Material UI XD Version</Typography>
              <Typography variant="body2">Add Progress Track</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Orders overview</Typography>
            <Typography variant="body2">24% this month</Typography>
            <Box mt={2}>
              <Typography variant="body2">$2400, Design changes</Typography>
              <Typography variant="body2">New order #1832412</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrafficTrend;
