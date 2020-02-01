import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };

    default:
      return state;
  }
};

const initialState = (value, valid) => ({
  value: value || "",
  isValid: valid || false,
  isTouched: false
});

const Input = ({
  label,
  id,
  element,
  type,
  placeholder,
  rows,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid
}) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    initialState(initialValue, initialValid)
  );

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const changeHandler = event => {
    dispatch({ type: "CHANGE", value: event.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };
  const Element =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={id}>{label}</label>
      {Element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
