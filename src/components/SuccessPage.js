import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Purchase Successful!
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your purchase. Your order has been successfully placed.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Container>
  );
};

export default SuccessPage;