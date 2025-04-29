export default function InputField({ label, id, ...props }) {
  return (
    <div className="form-inputField">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} {...props} />
    </div>
  );
}
