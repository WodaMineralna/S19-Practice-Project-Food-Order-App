export default function cartReducer(prevCartState, action) {
  if (action.type === "ADD_MEAL") {
    const existingCartItem = prevCartState.find(
      (item) => item.id === action.payload.id
    );

    if (existingCartItem) {
      return cartReducer(prevCartState, {
        type: "INCREMENT_QUANTITY",
        payload: existingCartItem.id,
      });
    } else {
      return [...prevCartState, { ...action.payload, quantity: 1 }];
    }
  }

  if (action.type === "DELETE_MEAL") {
    return prevCartState.filter(
      (prevCartItem) => prevCartItem.id !== action.payload
    );
  }

  if (action.type === "INCREMENT_QUANTITY") {
    return prevCartState.map((prevCartItem) =>
      prevCartItem.id === action.payload
        ? { ...prevCartItem, quantity: prevCartItem.quantity + 1 }
        : prevCartItem
    );
  }

  if (action.type === "DECREMENT_QUANTITY") {
    const selectedCartItem = prevCartState.find(
      (cartItem) => cartItem.id === action.payload
    );

    if (selectedCartItem.quantity === 1) {
      return cartReducer(prevCartState, {
        type: "DELETE_MEAL",
        payload: selectedCartItem.id,
      });
    } else {
      return prevCartState.map((prevCartItem) =>
        prevCartItem.id === action.payload
          ? { ...prevCartItem, quantity: prevCartItem.quantity - 1 }
          : prevCartItem
      );
    }
  }

  if (action.type === "CLEAR_CART") {
    return action.payload;
  }

  // default
  return prevCartState;
}
