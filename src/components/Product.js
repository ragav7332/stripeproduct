import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './ProductDetails';

const Product = ({ addToCart, addToFavorites }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBack={handleBackToList}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
      />
    );
  }



  return (
    <div className="container mt-4">
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <div class="card-img-top position-relative" style={{height:"200px"}}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  class = "img-fluid h-100 w-100 object-fit-contain"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(product)}
                />
                <IconButton 
                  className="position-absolute top-0 right-0 m-2"
                  onClick={() => addToFavorites(product)}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product)}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <IconButton 
                  color="primary"
                  onClick={() => addToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Product;