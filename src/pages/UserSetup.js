import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { getUsers, updateUser } from '../services/userServices';

const SearchBar = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(4),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#1AAE88',
  '& .MuiTableCell-root': {
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
}));

const UserSetup = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editableRow, setEditableRow] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setTableData(users);
      setFilteredData(users);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const value = searchTerm.toLowerCase();
    const filtered = tableData.filter(row =>
      row.first_name.toLowerCase().includes(value) ||
      row.last_name.toLowerCase().includes(value) ||
      row.standard_id.toLowerCase().includes(value) ||
      row.email.toLowerCase().includes(value) ||
      row.team.toLowerCase().includes(value) ||
      row.purpose.toLowerCase().includes(value) ||
      row.mrm_declaration.toString().toLowerCase().includes(value) ||
      row.unixuser.toString().toLowerCase().includes(value) ||
      row.jupyter_access.toString().toLowerCase().includes(value) ||
      row.hdfs_access.toString().toLowerCase().includes(value) ||
      row.jupyter_config.toLowerCase().includes(value) ||
      row.vault_config.toLowerCase().includes(value) ||
      row.databases.toLowerCase().includes(value) ||
      row.custom_profile.toString().toLowerCase().includes(value) ||
      row.s3_buckets.toLowerCase().includes(value) ||
      row.s3_buckets_access_list.toLowerCase().includes(value) ||
      row.quartz_access.toString().toLowerCase().includes(value) ||
      row.comments.toLowerCase().includes(value) ||
      row.isUserSetupCompleted.toString().toLowerCase().includes(value)
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

  const handleEditClick = (row) => {
    setEditableRow(row.id);
    setEditFormData(row);
  };

  const handleSaveClick = async (id) => {
    await updateUser(id, editFormData);
    const updatedData = tableData.map(row => (row.id === id ? editFormData : row));
    setTableData(updatedData);
    setFilteredData(updatedData);
    setEditableRow(null);
  };

  const handleSetupClick = async (id) => {
    const updatedUser = { ...tableData.find(row => row.id === id), isUserSetupCompleted: true };
    await updateUser(id, updatedUser); // Ensure the update is sent to the backend
    const updatedData = tableData.map(row => (row.id === id ? updatedUser : row));
    setTableData(updatedData);
    setFilteredData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
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

          {/* Grid with User Database Table */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper elevation={10} sx={{ padding: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Users
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <StyledTableHead>
                      <TableRow>
                        {['First Name', 'Last Name', 'Standard ID', 'Email', 'Team', 'Purpose', 'MRM Declaration', 'Unix User', 'Jupyter Access', 'HDFS Access', 'Jupyter Config', 'Vault Config', 'Databases', 'Custom Profile', 'S3 Buckets', 'S3 Buckets Access List', 'Quartz Access', 'Comments', 'User Setup Completed', 'Action'].map((header) => (
                          <TableCell key={header}>{header}</TableCell>
                        ))}
                      </TableRow>
                    </StyledTableHead>
                    <TableBody>
                      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="first_name"
                                value={editFormData.first_name}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.first_name
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="last_name"
                                value={editFormData.last_name}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.last_name
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="standard_id"
                                value={editFormData.standard_id}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.standard_id
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="email"
                                value={editFormData.email}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.email
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="team"
                                value={editFormData.team}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.team
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="purpose"
                                value={editFormData.purpose}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.purpose
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="mrm_declaration"
                                value={editFormData.mrm_declaration}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.mrm_declaration ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="unixuser"
                                value={editFormData.unixuser}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.unixuser ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="jupyter_access"
                                value={editFormData.jupyter_access}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.jupyter_access ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="hdfs_access"
                                value={editFormData.hdfs_access}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.hdfs_access ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="jupyter_config"
                                value={editFormData.jupyter_config}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.jupyter_config
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="vault_config"
                                value={editFormData.vault_config}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.vault_config
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="databases"
                                value={editFormData.databases}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.databases
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="custom_profile"
                                value={editFormData.custom_profile}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.custom_profile ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="s3_buckets"
                                value={editFormData.s3_buckets}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.s3_buckets
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="s3_buckets_access_list"
                                value={editFormData.s3_buckets_access_list}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.s3_buckets_access_list
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="quartz_access"
                                value={editFormData.quartz_access}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.quartz_access ? 'Yes' : 'No'
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editableRow === row.id ? (
                              <TextField
                                name="comments"
                                value={editFormData.comments}
                                onChange={handleInputChange}
                                fullWidth
                              />
                            ) : (
                              row.comments
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {row.isUserSetupCompleted ? 'Yes' : 'No'}
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center">
                              {editableRow === row.id ? (
                                <Button onClick={() => handleSaveClick(row.id)} variant="contained" color="primary" style={{ marginRight: 8 }}>Save</Button>
                              ) : (
                                <>
                                  <Button onClick={() => handleEditClick(row)} variant="contained" color="primary" style={{ marginRight: 8 }}>Edit</Button>
                                  {!row.isUserSetupCompleted && (
                                    <Button onClick={() => handleSetupClick(row.id)} variant="contained" color="secondary">Setup</Button>
                                  )}
                                </>
                              )}
                            </Box>
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
