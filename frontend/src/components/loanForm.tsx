import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';

interface LoanFormProps {
  onSubmit: (formData: any) => void;
  onFormSubmitSuccess: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, onFormSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '', 
    amount: '',
    tenure: '',
    reason: '',
    employmentStatus: '',
  });

  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [isCheckedDisclosure, setIsCheckedDisclosure] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCheckedTerms && isCheckedDisclosure) {
      onSubmit(formData);
      onFormSubmitSuccess();
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <Box 
      sx={{
        width: '800px',      // Adjust width to 90% of the screen
        maxWidth: '1200px', // Limit max width to a reasonable size
        margin: 'auto',     // Center the form horizontally
        //marginTop: 10,
        padding: 2          // Add some padding
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Apply for a Loan
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full name as it appears on bank account"
              name="name"  
              fullWidth
              variant="outlined"
              value={formData.name}  
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="How much do you need?"
              name="amount"
              fullWidth
              variant="outlined"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Loan tenure (in months)"
              name="tenure"
              fullWidth
              variant="outlined"
              type="number"
              value={formData.tenure}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employment status"
              name="employmentStatus"
              fullWidth
              variant="outlined"
              value={formData.employmentStatus}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reason for loan"
              name="reason"
              fullWidth
              variant="outlined"
              value={formData.reason}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
          
          {/* Terms and Conditions */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckedTerms}
                  onChange={() => setIsCheckedTerms(!isCheckedTerms)}
                />
              }
              label="I have read the important information and 
              accept that by completing the application I will be bound by the terms."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckedDisclosure}
                  onChange={() => setIsCheckedDisclosure(!isCheckedDisclosure)}
                />
              }
              label="Any personal and credit information obtained may be disclosed from time to time 
              to other lenders, credit bureuas or other credit reporting agencies."
            />
          </Grid>
        </Grid>

        <Box textAlign="center" marginTop={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoanForm;
