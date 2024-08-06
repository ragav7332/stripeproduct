// import React from 'react';
// import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

// const Cart = ({ items }) => {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Your Cart
//       </Typography>
//       <List>
//         {items.map((item, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={item.title} secondary={`$${item.price}`} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem , Button, IconButton, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import { useNavigate } from 'react-router-dom';


const Cart = ({ items, updateCart, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const itemsWithQuantity = items.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(itemsWithQuantity);
  }, [items]);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCartItems(updatedItems);
    updateCart(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    removeFromCart(id);
  };

   const handleCheckout = () => {
    navigate('/payment', { state: { cartItems, total } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ border: '1px solid #ddd', mb: 2, borderRadius: 2, alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <img src={item.image} alt={item.title} style={{ width: 80, height: 80, objectFit: 'contain', marginRight: 20 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price.toFixed(2)} each
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => handleQuantityChange(item.id, -1)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <TextField 
                    value={item.quantity} 
                    size="small" 
                    sx={{ width: 60, mx: 1 }}
                    InputProps={{ readOnly: true }}
                  />
                  <IconButton onClick={() => handleQuantityChange(item.id, 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <IconButton onClick={() => handleRemove(item.id)} color="error" sx={{ mt: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Typography variant="h6">
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default Cart;