import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { stripePromise } from './ProductDetails';
import { CreditCard as StripeIcon } from '@mui/icons-material';

export const BACK_URL = `https://stripebackend-x9ii.onrender.com`

const PaymentGateway = () => {
    const location = useLocation();
    const { cartItems, total } = location.state;
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
  
      loadRazorpayScript();
    }, []);

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch(`${BACK_URL}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems }),
    });
    const session = await response.json();
    console.log(session);
    
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error);
    }
  };

  const handleRazorpayPayment = async () => {
    const res = await fetch(`${BACK_URL}/create-razorpay-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }), // Razorpay expects amount in paise
    });
    const order = await res.json();

    const options = {
      key: 'rzp_test_TDgJsaFnQpL7w6', // Replace with your actual Razorpay key ID
      amount: order.amount,
      currency: 'INR',
      name: 'Shopping Choice',
      description: 'Purchase Description',
      order_id: order.id,
      handler: async (response) => {
        try {
          const result = await fetch(`${BACK_URL}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderCreationId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const data = await result.json();
          console.log(data.msg);
        if (data.msg === data.msg) {
          navigate('/success'); // Navigate to the success page
        }
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  };


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Payment Method
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStripePayment}
          startIcon={<StripeIcon />}
          sx={{
            backgroundColor: "rgba(63, 81, 181, 0.8)", // Transparent primary color
            "&:hover": {
              backgroundColor: "rgba(63, 81, 181, 0.9)",
            },
          }}
        >
          Pay with Stripe
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRazorpayPayment}
          startIcon={<StripeIcon />}
        >
          Pay with Razorpay
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentGateway;