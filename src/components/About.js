import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        We are a fictional store created for this example. Our mission is to provide high-quality products at affordable prices.
      </Typography>
    </Container>
  );
};

export default About;