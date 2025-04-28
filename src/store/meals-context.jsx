import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext({
  availableMeals: [],
  cart: [],
  addMealToCart: (meal) => {},
  debugResetLocalstorage: () => {}, // DEBUGGING
  isModalOpen: false,
});

// ?
// TODO in the future
// ?FIX less re-executes of the component
export function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [cart, setCart] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // get localstorage 'cart' data and update cart state
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  console.log(`${typeof cart}, 🔥Cart data: 🔥`, cart);

  // fetch availableMeals data from the backend
  useEffect(() => {
    async function loadAvailableMeals() {
      try {
        // ! USE 192.168.1.31 intead of 'localhost', beacuse data wont fetch on PC otherwise
        const response = await fetch("http://192.168.1.31:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        const availableMealsData = await response.json();
        setAvailableMeals(availableMealsData); // * we know that in this place we succesfully fetched data
      } catch (error) {
        // TODO add better error handling
        // ? Maybe <ErrorPage> component?
        console.error(
          "Could not fetch available meals, please try again later."
        );
      }
    }

    loadAvailableMeals();
  }, []);

  // * thats a 99% awesome idea, gtg rn
  // ^ useReducer having a "ADDMEAL", "DELETEMEAL", "PLUSQUANTITY", "MINUSQUANTITY" stuff, something like that
  // ? refactor to useReducer? - check Modal.jsx, comment @ line 29
  function addMealToCart(id, name, price) {
    // ? add this filtering method to different function?
    // ^ maybe util/validation.js? - must be created first!

    setCart((prevCart) => {
      const existingCartItem = prevCart.find((item) => item.id === id);

      if (existingCartItem) {
        return prevCart.map((prevCartItem) =>
          prevCartItem.id === id
            ? { ...prevCartItem, quantity: prevCartItem.quantity + 1 }
            : prevCartItem
        );
      } else {
        return [...prevCart, { id, name, price, quantity: 1 }];
      }
    });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // DEBUGGING
  function debugResetLocalstorage() {
    localStorage.clear();
    setCart([]);
  }

  function handleOpenModal() {
    console.log("Modal opened");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    console.log("Modal closed");
    setIsModalOpen(false);
  }

  const mealsValue = {
    availableMeals,
    // ? do we need to expose the whole `cart` state?
    cart,
    addMealToCart,
    debugResetLocalstorage, // DEBUGGING
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };

  return (
    <MealsContext.Provider value={mealsValue}>{children}</MealsContext.Provider>
  );
}
