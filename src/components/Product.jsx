import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Product({
  id,
  image,
  title,
  price,
  description,
  // onAddToCart   - this props is no longer needed, because we update state via CONTEXT now
}) {
  
  // const cartCtx = useContext(CartContext);
  // calling the useContext-hook and passing the CartContext value

  const {addItemToCart} = useContext(CartContext);
  // destructuring the cartCtx-object
  
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          {/* <button onClick={() => onAddToCart(id)}>Add to Cart</button> */}
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
          {/* instead of a prop 'onAddToCart', we have now added a function (2. property of the context-object) */}
        </p>
      </div>
    </article>
  );
}
