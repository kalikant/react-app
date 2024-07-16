import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import BookingsIcon from '@mui/icons-material/CalendarToday';
import UsersIcon from '@mui/icons-material/People';
import RevenueIcon from '@mui/icons-material/AttachMoney';
import FollowersIcon from '@mui/icons-material/PersonAdd';
import SalesIcon from '@mui/icons-material/TrendingUp';
import TasksIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

const pieData = [
  { name: 'High Usage', value: 400 },
  { name: 'Medium Usage', value: 300 },
  { name: 'Low Usage', value: 300 },
  { name: 'No Usage', value: 200 },
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

        {/* User Onboarding Trend */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              User Onboarding Trend
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120, marginRight: 1 }}>
                <InputLabel>Month</InputLabel>
                <Select label="Month" defaultValue="Month">
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" size="small">Go</Button>
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
            <Grid container justifyContent="space-between" mt={2}>
              <Grid item>
                <Typography variant="h6">5,860</Typography>
                <Typography variant="body2">New Users</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">10,450</Typography>
                <Typography variant="body2">Server Allocations</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">21,230</Typography>
                <Typography variant="body2">Active Servers</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">7,230</Typography>
                <Typography variant="body2">Active Users</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Server Usage Analysis */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Server Usage Analysis
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Last 24 Hours</InputLabel>
                <Select label="Last 24 Hours" defaultValue="Last 24 Hours">
                  <MenuItem value="Last 24 Hours">Last 24 Hours</MenuItem>
                  <MenuItem value="Last Week">Last Week</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Graphs */}
        <Grid item xs={12} md={4} sx={{ mt: 3 }}>
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
        <Grid item xs={12} md={4} sx={{ mt: 3 }}>
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
        <Grid item xs={12} md={4} sx={{ mt: 3 }}>
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
        <Grid item xs={12} sx={{ mt: 3 }}>
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
