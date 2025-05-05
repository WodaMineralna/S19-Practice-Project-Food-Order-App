import { use } from "react";
import { MealsContext } from "../store/meals-context";

import Meal from "./Meal";

import ErrorMessage from "./ErrorMessage";

export default function Meals() {
  const { availableMeals, isFetchingMeals, mealsErrorMessage } =
    use(MealsContext);

  // console.log(`JS Type of fetched Available Meals: ${typeof availableMeals}`); // DEBUG

  // DEBUG
  console.log("%cFetched availableMeals: ", "color: green;", availableMeals);

  if (isFetchingMeals) {
    return (
      <p className="fetching">Fetching available meals, please wait... </p>
    );
  }

  if (mealsErrorMessage) {
    return <ErrorMessage message={mealsErrorMessage} />;
  }

  return (
    <ul className="meals-list">
      {availableMeals.map((meal) => (
        <li className="mealItem" key={meal.id}>
          <Meal
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
            imgPath={meal.image}
          />
        </li>
      ))}
    </ul>
  );
}
