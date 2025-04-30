import { useActionState, use } from "react";

import { CartContext } from "../../store/cart-context";
import { ModalContext } from "../../store/modal-context";

import InputField from "./InputField";

import {
  isEmpty,
  isEmailAdress,
  isLongEnough,
  isPostalCodeValid,
} from "../../util/validation";

const ERROR_MESSAGES = {
  fullName: "Please enter your Full Name.",
  email: "E-Mail Adress must contain an '@' symbol.",
  street: "Please enter a street.",
  postalCode: "Postal Code must be in a XX-XXX pattern.",
  city: "Please enter a city.",
};

export default function ModalchangeModalPageForm() {
  const { submitOrder } = use(CartContext);
  const { changeModalPage, setErrorMessage } = use(ModalContext);

  async function submitOrderAction(prevFormState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    const errors = [];

    if (isEmpty(fullName) || !isLongEnough(fullName, 4))
      errors.push(ERROR_MESSAGES.fullName);
    if (!isEmailAdress(email)) errors.push(ERROR_MESSAGES.email);
    if (isEmpty(street)) errors.push(ERROR_MESSAGES.street);
    if (!isPostalCodeValid(postalCode)) errors.push(ERROR_MESSAGES.postalCode);
    if (isEmpty(city)) errors.push(ERROR_MESSAGES.city);

    console.log(
      `Full Name: ${fullName}, Email: ${email}, Street: ${street}, Postal Code: ${postalCode}, City: ${city}`
    ); // DEBUG

    console.log(errors);

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          fullName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    const errorMsg = await submitOrder({
      fullName,
      email,
      street,
      postalCode,
      city,
    });

    if (errorMsg) {
      console.error("Error submitting order: ", errorMsg);
      changeModalPage(4);
      setErrorMessage(errorMsg);
      return { errors: [errorMsg] };
    }

    changeModalPage(3);

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(submitOrderAction, {
    errors: null,
    // DEBUG random values
    enteredValues: {
      fullName: `John Doe, ${Math.random().toString(36).substring(2, 8)}`,
      email: `user${Math.random().toString(36).substring(2, 5)}@example.com`,
      street: `${Math.floor(Math.random() * 1000)} Random St`,
      postalCode: `${Math.floor(10 + Math.random() * 90)}-${Math.floor(
        100 + Math.random() * 900
      )}`,
      city: `City-${Math.random().toString(36).substring(2, 6)}`,
    },
  });

  return (
    <form action={formAction}>
      <div className="form-inputFields">
        <InputField
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={formState.enteredValues?.fullName}
        />

        <InputField
          label="E-Mail Adress"
          id="email"
          name="email"
          type="email"
          defaultValue={formState.enteredValues?.email}
        />

        <InputField
          label="Street"
          id="street"
          name="street"
          type="text"
          defaultValue={formState.enteredValues?.street}
        />

        <InputField
          label="Postal Code"
          id="postalCode"
          name="postalCode"
          type="text"
          placeholder="XX-XXX"
          defaultValue={formState.enteredValues?.postalCode}
        />

        <InputField
          label="City"
          id="city"
          name="city"
          type="text"
          defaultValue={formState.enteredValues?.city}
        />
      </div>
      <div className="formButtons">
        <button onClick={() => changeModalPage(1)} disabled={pending}>
          Go back
        </button>
        <button type="submit" disabled={pending}>
          {pending ? "Submitting your order..." : "Submit Order"}
        </button>
      </div>
      {formState.errors && (
        <ul className="form-errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
