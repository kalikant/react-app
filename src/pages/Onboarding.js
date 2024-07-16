// src/pages/Onboarding.js
import React, { useState, useEffect } from 'react';
import {
  Stepper, Step, StepLabel, Button, Paper, Typography, Box, TextField,
  FormControl, FormControlLabel, Checkbox, Radio, RadioGroup, Grid, Link, Avatar, Card, CardContent, Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon, Checklist as ChecklistIcon, Settings as SettingsIcon, Cloud as CloudIcon, Storage as StorageIcon, Security as SecurityIcon } from '@mui/icons-material';
import { createUser, updateUser, getUsers, deleteUser } from '../services/userServices';

const FormControlContainer = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomStepIcon = (props) => {
  const { active, completed, className } = props;

  const icons = {
    1: <ChecklistIcon style={{ fontSize: '2.5rem' }} />,
    2: <AccountCircleIcon style={{ fontSize: '2.5rem' }} />,
    3: <SettingsIcon style={{ fontSize: '2.5rem' }} />,
  };

  return (
    <div className={className} style={{ color: active || completed ? '#1AAE88' : 'rgba(0, 0, 0, 0.38)' }}>
      {icons[String(props.icon)]}
    </div>
  );
};

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    standard_id: '',
    email: '',
    team: '',
    purpose: '',
    mrm_declaration: false,
    unixuser: false,
    jupyter_access: false,
    hdfs_access: false,
    jupyter_config: '',
    vault_config: '',
    databases: '',
    custom_profile: false,
    s3_buckets: '',
    s3_buckets_access_list: '',
    quartz_access: false,
    comments: '',
  });
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (editingUserId) {
        await updateUser(editingUserId, formData);
      } else {
        await createUser(formData);
      }
      const users = await getUsers();
      setUsers(users);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user.id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const users = await getUsers();
    setUsers(users);
  };

  const steps = [
    {
      label: 'MRM Form',
      description: (
        <Card sx={{ mb: 2, bgcolor: 'white' }}>
          <CardContent>
            <Typography variant="body1">Notice Placeholder</Typography>
            <FormControlContainer component="fieldset">
              <Typography variant="body2">Section 2: Please select the options below</Typography>
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 1</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 2</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 3</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 4</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 5</Link>}
              />
            </FormControlContainer>
            <Typography variant="body1">Notice Placeholder</Typography>
            <FormControlContainer component="fieldset">
              <Typography variant="body2">Section 4: Please select one</Typography>
              <RadioGroup name="notice" row>
                <FormControlLabel value="yes" control={<Radio sx={{ color: '#1AAE88' }} />} label="Yes" />
                <FormControlLabel value="no" control={<Radio sx={{ color: '#1AAE88' }} />} label="No" />
              </RadioGroup>
            </FormControlContainer>
          </CardContent>
        </Card>
      ),
    },
    {
      label: 'Onboarding Form',
      description: (
        <Card sx={{ mb: 2, bgcolor: 'white' }}>
          <CardContent>
            <TextField name="first_name" label="First Name" fullWidth margin="normal" value={formData.first_name} onChange={handleChange} />
            <TextField name="last_name" label="Last Name" fullWidth margin="normal" value={formData.last_name} onChange={handleChange} />
            <TextField name="standard_id" label="Standard ID (NBK)" fullWidth margin="normal" value={formData.standard_id} onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
            <TextField name="team" label="Team Name" fullWidth margin="normal" value={formData.team} onChange={handleChange} />
            <TextField name="purpose" label="Purpose" fullWidth margin="normal" multiline rows={4} value={formData.purpose} onChange={handleChange} />
          </CardContent>
        </Card>
      ),
    },
    {
      label: 'Access Requests',
      description: (
        <Card sx={{ mb: 2, bgcolor: 'white' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Link component={RouterLink} to="#" underline="none">
                  <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                    <CloudIcon />
                  </Avatar>
                  <Typography align="center">Cloud Access</Typography>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link component={RouterLink} to="#" underline="none">
                  <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                    <StorageIcon />
                  </Avatar>
                  <Typography align="center">Storage Access</Typography>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Link component={RouterLink} to="#" underline="none">
                  <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                    <SecurityIcon />
                  </Avatar>
                  <Typography align="center">Security Access</Typography>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <Box mt={4} display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ width: '80%', padding: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider sx={{ my: 2 }} />
        <div>
          {activeStep === steps.length ? (
            <Paper square elevation={3} sx={{ p: 3 }}>
              <Typography>All steps completed - you're finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} variant="contained" size="large" style={{ backgroundColor: '#1AAE88', color: '#fff' }}>
                Reset
              </Button>
            </Paper>
          ) : (
            <Box>
              {steps[activeStep].description}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: '#1AAE88', color: '#fff' }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: '#1AAE88', color: '#fff' }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </div>
      </Paper>
    </Box>
  );
};

export default Onboarding;
