import { useState, useActionState, use } from "react";

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

export default function ModalForm() {
  const { totalCartPrice, submitOrder } = use(CartContext);
  const { changeModalPage, setErrorMessage } = use(ModalContext);

  // goofy way to fix this simple unwanted behaviour xd
  // input validation trigger - in InputField.jsx
  const [validationTrigger, setValidationTrigger] = useState(0);

  async function submitOrderAction(prevFormState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    const errors = [];
    const invalidInputs = [];

    if (isEmpty(fullName) || !isLongEnough(fullName, 4)) {
      errors.push(ERROR_MESSAGES.fullName);
      invalidInputs.push("fullName");
    }
    if (!isEmailAdress(email)) {
      errors.push(ERROR_MESSAGES.email);
      invalidInputs.push("email");
    }
    if (isEmpty(street)) {
      errors.push(ERROR_MESSAGES.street);
      invalidInputs.push("street");
    }
    if (!isPostalCodeValid(postalCode)) {
      errors.push(ERROR_MESSAGES.postalCode);
      invalidInputs.push("postalCode");
    }
    if (isEmpty(city)) {
      errors.push(ERROR_MESSAGES.city);
      invalidInputs.push("city");
    }

    // DEBUG
    console.log(
      `Full Name: ${fullName}, Email: ${email}, Street: ${street}, Postal Code: ${postalCode}, City: ${city}`
    );

    console.log(errors);

    if (errors.length > 0) {
      setValidationTrigger((prev) => prev + 1);
      return {
        errors,
        enteredValues: {
          fullName,
          email,
          street,
          postalCode,
          city,
        },
        invalidInputs: Object.fromEntries(
          invalidInputs.map((input) => [input, true])
        ),
      };
    }

    // potential error message
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
      <h2 className="modal-listTitle">Checkout</h2>
      <p className="modal-totalPrice">{`Total Amount: ${totalCartPrice}`}</p>
      <div className="form-inputFields">
        <InputField
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={formState.enteredValues?.fullName}
          invalid={formState.invalidInputs?.fullName}
          validationTrigger={validationTrigger}
        />

        <InputField
          label="E-Mail Address"
          id="email"
          name="email"
          type="email"
          defaultValue={formState.enteredValues?.email}
          invalid={formState.invalidInputs?.email}
          validationTrigger={validationTrigger}
        />

        <InputField
          label="Street"
          id="street"
          name="street"
          type="text"
          defaultValue={formState.enteredValues?.street}
          invalid={formState.invalidInputs?.street}
          validationTrigger={validationTrigger}
        />

        <div className="form-inputFields lastTwo">
          <InputField
            label="Postal Code"
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="XX-XXX"
            defaultValue={formState.enteredValues?.postalCode}
            invalid={formState.invalidInputs?.postalCode}
            validationTrigger={validationTrigger}
          />

          <InputField
            label="City"
            id="city"
            name="city"
            type="text"
            defaultValue={formState.enteredValues?.city}
            invalid={formState.invalidInputs?.city}
            validationTrigger={validationTrigger}
          />
        </div>
      </div>
      <div className="formButtons">
        <button
          onClick={() => changeModalPage(1)}
          disabled={pending}
          className="formButtons-goBackButton"
        >
          <span>Go back</span>
        </button>
        <button
          type="submit"
          disabled={pending}
          className="general-button formButtons-submitButton"
        >
          <span>{pending ? "Submitting your order..." : "Submit Order"}</span>
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
