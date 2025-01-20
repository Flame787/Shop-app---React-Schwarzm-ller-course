import { useContext } from "react";
// import { use } from "react";

// providing and consuming context in different child-components of the App.jsx:
import { CartContext } from "../store/shopping-cart-context";

// export default function Cart({ items, onUpdateItemQuantity }) {  // items-prop not needed anymore
  export default function Cart({ onUpdateItemQuantity }) {
  const cartCtx = useContext(CartContext);   // call the useContext-hook and provide the CartContext component as argument
// cartCtx = is value provided by the CONTEXT (either initial or updated value, depending on state)

// const cartCtx = use(CartContext); - alternative of useContext (new, React 19 and >)
// use-hook is more flexible, it could be used inside of an if-block (while useContext is not so flexible)
// usually we cannot use React hooks in if- or -for-loops
// but use-hook is available only in React version 19 or higher

// const totalPrice = items.reduce(
  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {/* {items.length === 0 && <p>No items in cart!</p>} */}
      {cartCtx.items.length === 0 && <p>No items in cart!</p>}
{/* using 'cartCtx.items' because our CONTEXT-value is an object with property: items: [] */}
      {/* {items.length > 0 && ( */}
      {cartCtx.items.length > 0 && (
        <ul id="cart-items">
          {/* {items.map((item) => { */}
          {cartCtx.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
