import { use } from "react";
import { MealsContext } from "../store/meals-context";

import Meal from "./Meal";

export default function Meals() {
  const { availableMeals, isFetchingMeals } = use(MealsContext);

  // console.log(
  //   `Type: ${typeof availableMeals}, 🔥Fetched availableMeals: `,
  //   availableMeals
  // ); // DEBUG

  if (isFetchingMeals) {
    return (
      <p className="fetching">Fetching available meals, please wait... </p>
    );
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
