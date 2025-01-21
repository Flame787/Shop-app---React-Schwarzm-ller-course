import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx"; // importing CONTEXT from the store-folder

function App() {
  // state for keeping track of items in the cart
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart, // function used as a value of the property 'addItemToCart'
    updateItemQuantity: handleUpdateCartItemQuantity
  };

  return (
    // <CartContext>   // - works with React vrsion 19 or higher (<CartContext.Provider> not needed)
    // Provider is a nested property/component on CartContext-object, needed for Context in older React versions

    // <CartContext.Provider value={{items: []}}>
    // wrapping with CONTEXT-component all components which should be able to access the CONTEXT
    // we need to add value-prop and provide the value for this prop (even just initial value) 
    // <CartContext.Provider value={shoppingCart}>
    
      // instead of value={{items: []}}, we put as value the state: {shoppingCart} 
      // now when we add items to buy into the cart, if cart (upper right) is clicked, the items are there,
      // and can be added or removed from cart - the state is reflected and can be easily modified 
      <CartContext.Provider value={ctxValue}>
        {/* using the new constant-object 'ctxValue' as a value for our context, so that we don't have
        to use props anymore, and we can not only read state, but also update state via CONTEXT only */}
      
      {/* <Header cart={shoppingCart} onUpdateCartItemQuantity={handleUpdateCartItemQuantity} /> */}
      {/* removed props from the <Header> component: */}
      <Header />

      {/* /moved logic for handling state from Shop.jsx to App.jsx (Shop.jsx is now just a wrapper-component): */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* <Product {...product} onAddToCart={handleAddItemToCart} /> */}
            {/* removed prop from <Product> component, because we only use context now: */}
            <Product {...product}  />   
            
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;

// next lession: 169 (Module 10)
