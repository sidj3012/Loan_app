import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Modal } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LoanForm from './loanForm';
import { Loan as LoanModel } from '../models/loan';

interface UserHomeProps {
  loans: LoanModel[];
  onSubmitLoan: (formData: any) => void;
}

const UserHome = ({ loans, onSubmitLoan }: UserHomeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatus = (loan: LoanModel): string => {
    if (loan.isRejected) {
      return 'REJECTED';
    } else if (loan.isApproved) {
      return 'APPROVED';
    } else if (loan.isVerified) {
      return 'VERIFIED';
    } else {
      return 'PENDING';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REJECTED':
        return 'red';
      case 'APPROVED':
        return 'blue';
      case 'VERIFIED':
        return 'green';
      case 'PENDING':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmitSuccess = () => {
    handleCloseModal();  // Close modal after form submission
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>CREDIT APP</Typography>
          <Button color="inherit" startIcon={<HomeIcon />}>Home</Button>
          <Button color="inherit" startIcon={<PaymentIcon />}>Payments</Button>
          <Button color="inherit" startIcon={<AccountBalanceWalletIcon />}>Budget</Button>
          <Button color="inherit">Card</Button>
          <Button color="inherit"><NotificationsIcon /></Button>
          <Button color="inherit"><PersonIcon /></Button>
        </Toolbar>
      </AppBar>

      {/* Make the container a bit wider */}
      <Container sx={{ marginTop: '20px', maxWidth: '1000px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>Deficit: ₦0.0</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>Get A Loan</Button>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>Applied Loans</Typography>
          
        </Box>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          {/* Make the modal responsive with better width */}
          <Box sx={{ 
              margin: 'auto', 
              marginTop: '50px',
              padding: '20px', 
              width: ['90%', '1000px'], // 90% for small screens, 400px for larger
              backgroundColor: 'white',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
            <LoanForm onSubmit={onSubmitLoan} onFormSubmitSuccess={handleFormSubmitSuccess} />
          </Box>
        </Modal>

        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Date Applied</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => {
                const status = getStatus(loan);
                return (
                  <TableRow key={loan._id}>
                    <TableCell>{loan.amount.toLocaleString()}</TableCell>
                    <TableCell>{loan.date ? new Date(loan.date).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <span style={{ color: getStatusColor(status), fontWeight: 'bold' }}>
                        {status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
};

export default UserHome;
