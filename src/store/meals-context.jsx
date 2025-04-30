import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext({
  availableMeals: [],
  isFetchingMeals: false,
  mealsErrorMessage: null,
});

// ?FIX less re-executes of the component
export function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetchingMeals, setIsFetchingMeals] = useState(false);
  const [mealsErrorMessage, setMealsErrorMessage] = useState(null);

  // fetch availableMeals data from the backend
  useEffect(() => {
    async function loadAvailableMeals() {
      setIsFetchingMeals(true);
      try {
        // ! USE 192.168.1.31 intead of 'localhost', beacuse data wont fetch on PC otherwise
        const response = await fetch("http://192.168.1.31:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        const availableMealsData = await response.json();
        setAvailableMeals(availableMealsData); // * we know that in this place we succesfully fetched data
      } catch (error) {
        console.error(
          error.message ||
            "Could not fetch available meals, please try again later."
        );
        setMealsErrorMessage(
          error.message ||
            "Could not fetch available meals, please try again later."
        );
      }
      setIsFetchingMeals(false);
    }

    loadAvailableMeals();
  }, []);

  const mealsValue = {
    availableMeals,
    isFetchingMeals,
    mealsErrorMessage,
  };

  return (
    <MealsContext.Provider value={mealsValue}>{children}</MealsContext.Provider>
  );
}
