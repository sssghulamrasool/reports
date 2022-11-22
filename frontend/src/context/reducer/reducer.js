import { createContext, useReducer } from "react";

export const ContextUsed = createContext();
const initialState = {
  addProduct: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADDPRODUCT":
      return {
        ...state,
        addProduct: !state.addProduct,
      };
    default:
      return state;
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextUsed.Provider value={{ state, dispatch }}>
      {children}
    </ContextUsed.Provider>
  );
};
