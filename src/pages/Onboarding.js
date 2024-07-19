// src/pages/Onboarding.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Stepper, Step, StepLabel, Button, Paper, Typography, Box, TextField,
  FormControl, FormControlLabel, Checkbox, Radio, RadioGroup, Grid, Link, Avatar, Card, CardContent, CardActions, Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon, Checklist as ChecklistIcon, Settings as SettingsIcon, Storage as StorageIcon, Security as SecurityIcon, Terminal as TerminalIcon, Cloud as CloudIcon } from '@mui/icons-material';
import { createUser, getUsers } from '../services/userServices';
import axios from 'axios';

const FormControlContainer = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomStepIcon = React.memo((props) => {
  const { active, completed, className } = props;

  const icons = useMemo(() => ({
    1: <ChecklistIcon style={{ fontSize: '2.5rem' }} />,
    2: <AccountCircleIcon style={{ fontSize: '2.5rem' }} />,
    3: <SettingsIcon style={{ fontSize: '2.5rem' }} />,
  }), []);

  return (
    <div className={className} style={{ color: active || completed ? '#1AAE88' : 'rgba(0, 0, 0, 0.38)' }}>
      {icons[String(props.icon)]}
    </div>
  );
});

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    standard_id: '',
    email: '',
    team: '',
    purpose: '',
    mrm_policy_1: false,
    mrm_policy_2: false,
    mrm_policy_3: false,
    mrm_policy_4: false,
    mrm_policy_5: false,
    notice_2: false,
    vault_config: '',
    databases: '',
    custom_profile: false,
    s3_buckets: '',
    s3_buckets_access_list: '',
    quartz_access: false,
    comments: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);
  const [accessResponses, setAccessResponses] = useState({
    unix_access: null,
    hdfs_access: null,
    jupyter_server: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      // setUsers(users); // If you need to use the fetched users data
    };
    fetchUsers();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }, []);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    const validateStep = () => {
      let isValid = false;
      if (activeStep === 0) {
        isValid = formData.mrm_policy_1 && formData.mrm_policy_2 && formData.mrm_policy_3 && formData.mrm_policy_4 && formData.mrm_policy_5 && formData.notice_2;
      } else if (activeStep === 1) {
        const requiredFields = [
          'first_name', 'last_name', 'standard_id', 'email', 'team', 'purpose'
        ];
        const allFieldsFilled = requiredFields.every(field => formData[field]);
        const emailValid = validateEmail(formData.email);
        setEmailError(!emailValid);
        isValid = allFieldsFilled && emailValid;
      } else if (activeStep === 2) {
        isValid = true; // Assuming no validation is needed for Access Requests step
      }
      setIsStepValid(isValid);
    };

    validateStep();
  }, [formData, activeStep]);

  const handleNext = useCallback(async () => {
    if (activeStep === steps.length - 1) {
      await createUser(formData);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [activeStep, formData]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleRequestAccess = async (type) => {
    try {
      const response = await axios.get(`https://api.example.com/request-${type}`);
      setAccessResponses((prev) => ({ ...prev, [type]: response.data }));
    } catch (error) {
      setAccessResponses((prev) => ({ ...prev, [type]: 'Failed to fetch data' }));
    }
  };

  const steps = useMemo(() => [
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
                name="mrm_policy_1"
                checked={formData.mrm_policy_1}
                onChange={handleChange}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 1</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                name="mrm_policy_2"
                checked={formData.mrm_policy_2}
                onChange={handleChange}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 2</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                name="mrm_policy_3"
                checked={formData.mrm_policy_3}
                onChange={handleChange}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 3</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                name="mrm_policy_4"
                checked={formData.mrm_policy_4}
                onChange={handleChange}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 4</Link>}
              />
              <FormControlLabel
                control={<Checkbox sx={{ color: '#1AAE88' }} />}
                name="mrm_policy_5"
                checked={formData.mrm_policy_5}
                onChange={handleChange}
                label={<Link component={RouterLink} to="#" sx={{ color: '#1D89CF' }}>Policy 5</Link>}
              />
            </FormControlContainer>
            <Typography variant="body1">Notice Placeholder</Typography>
            <FormControlContainer component="fieldset">
              <Typography variant="body2">Section 4: Please select one</Typography>
              <RadioGroup name="notice_2" row value={formData.notice_2} onChange={handleChange}>
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
            <TextField name="email" label="Email" fullWidth margin="normal" value={formData.email} onChange={handleChange} error={emailError} helperText={emailError ? "Enter a valid email" : ""} />
            <TextField name="team" label="Team Name" fullWidth margin="normal" value={formData.team} onChange={handleChange} />
            <TextField name="purpose" label="Purpose" fullWidth margin="normal" multiline rows={4} value={formData.purpose} onChange={handleChange} />
          </CardContent>
        </Card>
      ),
    },
    {
      label: 'Access Requests',
      description: (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                  <TerminalIcon />
                </Avatar>
                <Typography align="center">Unix Access</Typography>
                <Box mt={2}>
                  <Typography align="center">{accessResponses.unix_access}</Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestAccess('unix_access')}>Request Access</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                  <StorageIcon />
                </Avatar>
                <Typography align="center">HDFS Access</Typography>
                <Box mt={2}>
                  <Typography align="center">{accessResponses.hdfs_access}</Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestAccess('hdfs_access')}>Request Access</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent>
                <Avatar sx={{ bgcolor: '#1D89CF', margin: 'auto' }}>
                  <SecurityIcon />
                </Avatar>
                <Typography align="center">Jupyter Server</Typography>
                <Box mt={2}>
                  <Typography align="center">{accessResponses.jupyter_server}</Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestAccess('jupyter_server')}>Request Access</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ),
    },
  ], [formData, handleChange, emailError, accessResponses]);

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
              <Typography>All onboarding steps completed - Kindly wait for your Requests to be completed.</Typography>
            </Paper>
          ) : (
            <Box>
              {steps[activeStep].description}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep !== 0 && (
                  <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="contained"
                    size="large"
                    style={{ backgroundColor: '#1AAE88', color: '#fff' }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: isStepValid ? '#1AAE88' : 'grey', color: '#fff' }}
                  disabled={!isStepValid}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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
