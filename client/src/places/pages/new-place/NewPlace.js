import React, { useContext } from "react";
import Input from "../../../shared/components/form-element/input/Input";

import "./NewPlace.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../../shared/utils/validators";
import Button from "../../../shared/components/form-element/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { PlacesContext } from "../../../shared/context/places/places-context";
import { getAuthData } from "../../../shared/utils/requests";

const initialState = {
  inputs: {
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    },
    address: {
      value: "",
      isValid: false
    }
  },
  isValid: false
};

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    initialState.inputs,
    initialState.isValid
  );

  const { addPlace, loading } = useContext(PlacesContext);

  const handleSubmit = event => {
    event.preventDefault();
    const data = getAuthData(formState);
    addPlace(data);
  };
  return (
    <form className="place-form" onSubmit={handleSubmit}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please, entered a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please, entered a valid description (at 5 characters)"
        onInput={inputHandler}
      />
      <Input
        id="address"
        label="Address"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please, entered a valid address"
        onInput={inputHandler}
      />
      <Input
        id="image"
        label="Image URL"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please, entered a valid image Url"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid || loading}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
