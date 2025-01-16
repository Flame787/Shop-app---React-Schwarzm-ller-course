// import { DUMMY_PRODUCTS } from '../dummy-products.js';
// import Product from './Product.jsx';

// we moved the logic from the Shop-componenent into App.jsx, so that Shop.jsx is now just a wrapper,
// it's not getting any props except for 'children'-prop, to be able to output it's inner content dinamically.
export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {/* {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))} */}
        {children}
      </ul>
    </section>
  );
}
