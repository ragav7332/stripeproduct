import React from 'react';
import { Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { BACK_URL } from './PaymentGateway';

export const stripePromise = loadStripe("pk_test_51Op2jxSH07kZkgBpyO0TOpGjkZyaRF3FRv7G66aneTF8qqjR8GGIAq1tXHQBoaZ82qbgAYLLPBof0TIOhxJd1HeZ00IZXUnCjX");


const ProductDetails = ({ product, onBack ,addToCart, addToFavorites }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch(`${BACK_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [{
          ...product,
          qnty: 1  
        }]
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Handle any errors that occur during the redirect
      console.error(result.error);
    }
  };

  return (
    <div className="container mt-4">
      <Button onClick={onBack} variant="outlined" className="mb-3">
        Back to Products
      </Button>
      <Card style={{width:"50%",display:"flex",flexWrap:"wrap",marginLeft:"25%"}}>
      <div class="card-img-top" style={{height:"300px"}}>
                <img
                  src={product.image}
                  alt={product.title}
                  class="img-fluid h-100 w-100 object-fit-contain"
                />
                <IconButton 
            className="position-absolute top-0 right-0 m-2"
            onClick={() => addToFavorites(product)}
          >
            <FavoriteIcon color="error" />
          </IconButton>
              </div>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" className="mb-2">
            ${product.price}
          </Typography>
          <Typography variant="body1" className="mb-2">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" className="mb-3" style={{textAlign:"justify"}}>
            {product.description}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCart(product)}
            className="me-2"
          >
            Add to Cart
          </Button>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;