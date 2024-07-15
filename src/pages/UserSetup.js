// src/pages/UserSetup.js
import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, InputAdornment, Link } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),
}));

const PendingItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const UserSetup = () => {
  const pendingItems = ['Pending Item 1', 'Pending Item 2', 'Pending Item 3'];

  const initialTableData = Array.from({ length: 20 }, (_, index) => ({
    date: `2023-07-${(index + 1).toString().padStart(2, '0')}`,
    nbk: `NBK${(index + 1).toString().padStart(4, '0')}`,
    firstName: `First${index + 1}`,
    lastName: `Last${index + 1}`,
    email: `user${index + 1}@example.com`,
    team: `Team${index % 4 + 1}`,
    jupyter: index % 2 === 0 ? 'Yes' : 'No',
    access1: `Access${index % 3 + 1}`,
    access2: `Access${index % 3 + 2}`,
    access3: `Access${index % 3 + 3}`,
    purpose: `Purpose${index + 1}`,
    ipAddress: `192.168.0.${index + 1}`,
  }));

  const [tableData, setTableData] = useState(initialTableData);
  const [filteredData, setFilteredData] = useState(initialTableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const value = searchTerm.toLowerCase();
    const filtered = tableData.filter(row =>
      row.date.toLowerCase().includes(value) ||
      row.nbk.toLowerCase().includes(value) ||
      row.firstName.toLowerCase().includes(value) ||
      row.lastName.toLowerCase().includes(value) ||
      row.email.toLowerCase().includes(value) ||
      row.team.toLowerCase().includes(value) ||
      row.jupyter.toLowerCase().includes(value) ||
      row.access1.toLowerCase().includes(value) ||
      row.access2.toLowerCase().includes(value) ||
      row.access3.toLowerCase().includes(value) ||
      row.purpose.toLowerCase().includes(value) ||
      row.ipAddress.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Box width="90%">
        <Paper elevation={10} sx={{ padding: 2 }}>
          {/* Top Section: Search Bar */}
          <Paper elevation={10} sx={{ padding: 1, marginBottom: 1 }}>
            <SearchBar
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                'aria-label': 'search',
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleSearch}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
                style: { color: 'black' }
              }}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'black',
                  },
                  '&:hover fieldset': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </Paper>
          
          <Grid container spacing={1}>
            {/* Second Section: Stack Box with Pending Items */}
            <Grid item xs={12} md={2}>
              <Paper elevation={10} sx={{ padding: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Pending Items
                </Typography>
                <Stack spacing={2}>
                  {pendingItems.map((item, index) => (
                    <PendingItem elevation={3} key={index}>
                      <Link href="#" underline="none">{item}</Link>
                    </PendingItem>
                  ))}
                </Stack>
              </Paper>
            </Grid>
            
            {/* Third Section: Grid with User Database Table */}
            <Grid item xs={12} md={10}>
              <Paper elevation={10} sx={{ padding: 1 }}>
                <Typography variant="h6" gutterBottom>
                  User Database Table
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {['Date', 'NBK', 'First Name', 'Last Name', 'Email', 'Team', 'Jupyter', 'Access-1', 'Access-2', 'Access-3', 'Purpose', 'IP Address', 'Action'].map((header) => (
                          <TableCell key={header}>{header}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.nbk}</TableCell>
                          <TableCell>{row.firstName}</TableCell>
                          <TableCell>{row.lastName}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.team}</TableCell>
                          <TableCell>{row.jupyter}</TableCell>
                          <TableCell>{row.access1}</TableCell>
                          <TableCell>{row.access2}</TableCell>
                          <TableCell>{row.access3}</TableCell>
                          <TableCell>{row.purpose}</TableCell>
                          <TableCell>{row.ipAddress}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="primary">Setup</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserSetup;
