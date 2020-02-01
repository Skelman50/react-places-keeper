import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../shared/components/form-element/input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../../shared/utils/validators";
import Button from "../../../shared/components/form-element/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import Card from "../../../shared/components/UIElements/card/Card";
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
    }
  },
  isValid: false
};

const UpdatePlace = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { place, getPlace, loading, editPlace, error } = useContext(
    PlacesContext
  );
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    initialState.inputs,
    initialState.isValid
  );

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: {
            value: place.title,
            isValid: true
          },
          description: {
            value: place.description,
            isValid: true
          }
        },
        true
      );
    }
  }, [place, setFormData]);

  useEffect(() => {
    getPlace(placeId);
  }, [getPlace, placeId]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = getAuthData(formState);
    setIsSuccess(false);
    await editPlace(data, placeId);
    setIsSuccess(true);
  };

  if (error) {
    if (error) {
      return (
        <div className="place-list center">
          <Card>
            <h2>{error}</h2>
          </Card>
        </div>
      );
    }
  }

  if (!place && !loading) {
    return (
      <div className="center">
        <Card>
          <h2>No Places</h2>
        </Card>
      </div>
    );
  }

  if (loading || !place) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={handleSubmit}>
      {isSuccess && !error && <div className="center">SUCCESS!</div>}
      {error && <div className="center">{error}</div>}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid || (loading && place)}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
