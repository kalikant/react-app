// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment } from '@mui/material';
import BookingsIcon from '@mui/icons-material/CalendarToday';
import UsersIcon from '@mui/icons-material/People';
import RevenueIcon from '@mui/icons-material/AttachMoney';
import FollowersIcon from '@mui/icons-material/PersonAdd';
import SalesIcon from '@mui/icons-material/TrendingUp';
import TasksIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
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

const tableData = [
  { date: '2023-07-01', name: 'John Doe', status: 'Active', role: 'Admin' },
  { date: '2023-07-02', name: 'Jane Smith', status: 'Inactive', role: 'User' },
  // Add more rows as needed
];

const Dashboard = () => {
  const sections = [
    { icon: <BookingsIcon sx={{ fontSize: 50 }} />, title: 'Onboarding', value: '281', info: '+55% than last week', bgColor: '#1AAE88' },
    { icon: <UsersIcon sx={{ fontSize: 50 }} />, title: 'Online Users', value: '2,300', info: '+3% than yesterday', bgColor: '#49a3f1' },
    { icon: <RevenueIcon sx={{ fontSize: 50 }} />, title: 'Notebooks', value: '34k', info: '+1% than yesterday', bgColor: '#118a8c' },
    { icon: <FollowersIcon sx={{ fontSize: 50 }} />, title: 'Servers', value: '91', info: 'Good health', bgColor: '#1AAE88' },
    { icon: <SalesIcon sx={{ fontSize: 50 }} />, title: 'Memory', value: '4.5/10 TB', info: '+10% than yesterday', bgColor: '#49a3f1' },
    { icon: <TasksIcon sx={{ fontSize: 50 }} />, title: 'Memory Consumption', value: '5 GB avg', info: 'Per user', bgColor: '#118a8c' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tableData.filter(row => row.name.toLowerCase().includes(value) || row.status.toLowerCase().includes(value) || row.role.toLowerCase().includes(value));
    setFilteredData(filtered);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Top row of statistics */}
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: section.bgColor, color: '#ffffff' }}>
              {section.icon}
              <Typography variant="h5">{section.title}</Typography>
              <Typography variant="h4">{section.value}</Typography>
              <Typography variant="body2">{section.info}</Typography>
            </Paper>
          </Grid>
        ))}

        {/* Graphs */}
        <Grid item xs={12} md={4}>
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
                <Bar dataKey="uv" fill="#1AAE88" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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

        {/* Table with Search */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Users</Typography>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
