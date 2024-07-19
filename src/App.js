// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Product from './components/Product';
// import ProductDetails from './components/ProductDetails';
// import About from './components/About';
// import Cart from './components/Cart';

// function App() {
//   const [cart, setCart] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const addToFavorites = (product) => {
//     setFavorites([...favorites, product]);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Header cartItemsCount={cart.length} />
//         <Routes>
//           <Route path="/" element={
//             <Product
//               addToCart={addToCart} 
//               addToFavorites={addToFavorites} 
//             />
//           } />
//           <Route path="/product/:id" element={
//             <ProductDetails 
//               addToCart={addToCart} 
//               addToFavorites={addToFavorites}
//             />
//           } />
//           <Route path="/about" element={<About />} />
//           <Route path="/cart" element={<Cart items={cart} />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import About from './components/About';
import Cart from './components/Cart';
import PaymentGateway from './components/PaymentGateway';
import SuccessPage from './components/SuccessPage';

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateCart = (updatedItems) => {
    setCart(updatedItems);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(item => item.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={
            <Product
              addToCart={addToCart} 
              addToFavorites={addToFavorites} 
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetails 
              addToCart={addToCart} 
              addToFavorites={addToFavorites}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={
            <Cart 
              items={cart} 
              updateCart={updateCart} 
              removeFromCart={removeFromCart} 
            />
          } />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/success" element={<SuccessPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;