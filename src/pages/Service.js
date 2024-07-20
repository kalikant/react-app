// src/pages/Service.js
import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const services = [
  { icon: <DescriptionIcon style={{ fontSize: 100 }} />, label: 'Docs' },
  { icon: <LaptopMacIcon style={{ fontSize: 100 }} />, label: 'Jupyter' },
  { icon: <DashboardIcon style={{ fontSize: 100 }} />, label: 'Hue' },
  { icon: <AssignmentTurnedInIcon style={{ fontSize: 100 }} />, label: 'Onboarding' },
  { icon: <ContactSupportIcon style={{ fontSize: 100 }} />, label: 'Support Ticket' },
  { icon: <ContactMailIcon style={{ fontSize: 100 }} />, label: 'Contact' },
  { icon: <BuildIcon style={{ fontSize: 100 }} />, label: 'Fix My Server' },
  { icon: <SecurityIcon style={{ fontSize: 100 }} />, label: 'Access Checker' },
  { icon: <WifiIcon style={{ fontSize: 100 }} />, label: "What's My IP" },
  { icon: <LocalShippingIcon style={{ fontSize: 100 }} />, label: 'Packages' },
];

const libraries = [
  { library: 'numpy', version: '1.21.0' },
  { library: 'pandas', version: '1.3.0' },
  { library: 'scikit-learn', version: '0.24.2' },
  // Add more libraries as needed
];

const Service = () => {
  const [open, setOpen] = useState(false);
  const [kernel, setKernel] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [output, setOutput] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowTable(false);
    setKernel('');
    setOutput('');
  };

  const handleKernelChange = (event) => {
    setKernel(event.target.value);
  };

  const handleKernelSelect = () => {
    setShowTable(true);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(libraries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Libraries');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'libraries.xlsx');
  };

  const downloadCSV = () => {
    const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(libraries));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'libraries.csv');
  };

  const handleServiceClick = async (label) => {
    if (label === 'Packages') {
      setDialogTitle('Select Kernel');
      handleClickOpen();
    } else if (label === 'Docs') {
      navigate('/documentation');
    } else {
      setDialogTitle(label);
      try {
        const response = await axios.get(`https://api.example.com/${label.toLowerCase()}`);
        setOutput(response.data);
        handleClickOpen();
      } catch (error) {
        setOutput('Error fetching data');
        handleClickOpen();
      }
    }
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper elevation={10} sx={{ padding: 4, width: '90%' }}>
        <Typography variant="h4" gutterBottom>
          Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={4} md={2} key={index} sx={{ textAlign: 'center' }}>
              <IconButton
                color="primary"
                sx={{ fontSize: 100, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => handleServiceClick(service.label)}
              >
                {service.icon}
                <Typography variant="h6" mt={2}>{service.label}</Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogTitle === 'Select Kernel' ? (
            <>
              <Select
                value={kernel}
                onChange={handleKernelChange}
                displayEmpty
                fullWidth
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="" disabled>Select a kernel</MenuItem>
                <MenuItem value="python3.9">python3.9</MenuItem>
                <MenuItem value="python3.9 nightly">python3.9 nightly</MenuItem>
                <MenuItem value="Quartz">Quartz</MenuItem>
                <MenuItem value="Quartz Nightly">Quartz Nightly</MenuItem>
                <MenuItem value="DASH">DASH</MenuItem>
                <MenuItem value="DASH nightly">DASH nightly</MenuItem>
              </Select>
              {showTable && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Library</TableCell>
                        <TableCell>Version</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {libraries.map((library, index) => (
                        <TableRow key={index}>
                          <TableCell>{library.library}</TableCell>
                          <TableCell>{library.version}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          ) : (
            <Typography>{output}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {dialogTitle === 'Select Kernel' && showTable ? (
            <>
              <Button onClick={downloadExcel} color="primary">Download Excel</Button>
              <Button onClick={downloadCSV} color="primary">Download CSV</Button>
              <Button onClick={handleClose} color="primary">Close</Button>
            </>
          ) : dialogTitle === 'Select Kernel' ? (
            <Button onClick={handleKernelSelect} color="primary" disabled={!kernel}>Select</Button>
          ) : (
            <Button onClick={handleClose} color="primary">Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Service;
