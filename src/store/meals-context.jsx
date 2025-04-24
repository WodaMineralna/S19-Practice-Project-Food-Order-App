import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext({
  availableMeals: {},
  addMeal: (meal) => {},
  // TODO add rest
});

export function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);

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

  const mealsValue = {
    availableMeals: availableMeals,
    // TODO add rest
  };

  return (
    <MealsContext.Provider value={mealsValue}>{children}</MealsContext.Provider>
  );
}
