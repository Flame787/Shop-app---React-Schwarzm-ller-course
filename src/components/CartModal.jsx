import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart';
// import { CartContext } from '../store/shopping-cart-context.jsx';   
// - context is not needed in this component, but in Cart.jsx

const CartModal = forwardRef(function Modal(
  // { cartItems, onUpdateCartItemQuantity, title, actions },
  {  title, actions },
  ref
) {
  const dialog = useRef();

  // new, if we are using context - destructuring the cartCtx-object:
// const {items, updateItemQuantity } = useContext(CartContext); - commented, we don't need context here actually

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      {/* <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} /> */}
      {/* removing props (now when everything goes through Context): */}
      <Cart  />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
