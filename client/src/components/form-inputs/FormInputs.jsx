import "./FormInputs.scss";

const FormInputs = ({ name, type, reference, errorHandler, errorType }) => {
  return (
    <div className="form-input">
      <label>{name}</label>
      <input
        required
        type={type}
        name={name}
        ref={reference}
        onFocus={errorHandler}
        className={errorType ? `error` : ``}
      />
      {errorType && <span style={{ color: "red" }}>{errorType}</span>}
    </div>
  );
};

export default FormInputs;
