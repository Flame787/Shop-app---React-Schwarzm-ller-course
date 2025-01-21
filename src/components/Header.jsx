import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';
import { CartContext } from '../store/shopping-cart-context.jsx';

// export default function Header({ cart, onUpdateCartItemQuantity }) {
export default function Header() {
  const modal = useRef();

  // new, after importing context - we can destructure cartCtx-object:
  const { items } = useContext(CartContext);

  // const cartQuantity = cart.items.length;
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        // cartItems={cart.items}
        // onUpdateCartItemQuantity={onUpdateCartItemQuantity}  - not needed props, can be fetched via context
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
