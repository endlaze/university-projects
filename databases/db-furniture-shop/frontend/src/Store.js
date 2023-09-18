import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
  cart: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'add-to-cart':
      const found = state.cart.some(fur => fur.codigoProducto === action.codigoProducto)
      return found ?  state : { cart: [...state.cart, {...action.furniture, quantity: 1}]};
    case 'delete-from-cart':
      let filtered = state.cart.filter(function(value){ return value.codigoProducto !== action.id;});
      return {cart: filtered};
    case 'change-quantity':
      let modified = state.cart.map((element) => element.codigoProducto===action.id? {...element, quantity: action.quantity} : element )
      return {cart: modified}
    case 'clear-cart':
      return {cart: []}
    case 'apply-discount':
      console.log(action.discount)
      let discounted = state.cart.map((element)=> ({...element, precio: element.precio * (1- parseFloat(action.discount))} ))
      return {cart: discounted}
    default:
      return state
    
  }
}

const StoreContext = createContext()


export const StoreProvider = ({children}) => {
  const contextValue = useReducer(reducer, initialState);

  return(
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );

}

export const useStore = () => {
  const contextValue = useContext(StoreContext);
  return contextValue;
}

