import { useState, useEffect } from "react";

export default function InputField({
  label,
  id,
  invalid,
  validationTrigger,
  ...props
}) {
  const [highlightInvalidInput, setHighlightInvalidInput] = useState(invalid);

  useEffect(() => {
    setHighlightInvalidInput(invalid);
  }, [invalid, validationTrigger]);

  return (
    <div className="form-inputFieldWrapper">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={highlightInvalidInput ? "form-input-wasInvalid" : ""}
        onClick={() => setHighlightInvalidInput("")}
        {...props}
      />
    </div>
  );
}
