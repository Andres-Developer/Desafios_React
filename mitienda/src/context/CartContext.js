import React, { createContext, useState } from "react";

export default ({ children }) => {
    const [state, setState] = useState({});
    return (
        <CartContext.Provider value={[state, setState]}>
            {children}
        </CartContext.Provider>
    );
};

export const CartContext = createContext();
