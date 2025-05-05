
export default function InputField({ label, id, invalid, ...props }) {
  return (
    <div className="form-inputFieldWrapper">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`${invalid ? "form-input-wasInvalid" : ""}`}
        {...props}
      />
    </div>
  );
}
