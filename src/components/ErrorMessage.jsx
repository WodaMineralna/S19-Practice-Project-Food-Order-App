export default function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <h2>An error has occured!</h2>
      <p>{message}</p>
      <strong>Please reload the page or try again later...</strong>
    </div>
  );
}
