/*This is a file inside of a 'store' folder, used for saving mutual 'context' which can be later wrapped 
around different components and provided to them */

import { createContext } from "react";

export const CartContext = createContext({   //defining initial values: can be string, number, array or object
    items: [],
    addItemToCart: () => {}   // adding an empty dummy function - updating state only via context, not props
});
