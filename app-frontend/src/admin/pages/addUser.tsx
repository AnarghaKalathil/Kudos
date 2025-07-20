import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';

const AddUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('User submitted:', formData);
    setSnackbarOpen(true);
    setFormData({
      name: '',
      email: '',
      designation: '',
      password: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      justifyContent="flex-start"
      sx={{ padding: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Kudos!
      </Typography>

      <Breadcrumbs sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <Link href="/admin/userlist" underline="hover" color="inherit">List</Link>
        <Typography color="text.primary">Add new user</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
          />
          <TextField
            label="Designation"
            value={formData.designation}
            onChange={handleChange('designation')}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          User is added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddUserPage;
