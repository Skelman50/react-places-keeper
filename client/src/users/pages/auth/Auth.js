import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Card from "../../../shared/components/UIElements/card/Card";
import Input from "../../../shared/components/form-element/input/Input";
import Button from "../../../shared/components/form-element/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../../shared/utils/validators";
import { UserContext } from "../../../shared/context/auth/auth-context";
import { getAuthData } from "../../../shared/utils/requests";
import { Redirect } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, loading, isLoggedIn, signup } = useContext(UserContext);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const [disabled, setDisabled] = useState(!formState.isValid);

  useEffect(() => {
    if (isLogin) {
      setDisabled(
        !formState.inputs.email.isValid || !formState.inputs.password.isValid
      );
    } else {
      setDisabled(
        !formState.inputs.email.isValid ||
          !formState.inputs.image.isValid ||
          !formState.inputs.password.isValid ||
          (formState.inputs.name && !formState.inputs.name.isValid)
      );
    }
  }, [isLogin, formState.inputs]);

  const authSubmitHandler = event => {
    event.preventDefault();
    const data = getAuthData(formState);
    if (isLogin) {
      login(data);
    } else {
      signup(data);
    }
  };

  const switchModeHandler = () => {
    setIsLogin(prevstate => !prevstate);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Card className="authentication">
      <h2>{isLogin ? "LOGIN" : "SIGNUP"}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            element="input"
            type="text"
            id="name"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        {!isLogin && (
          <Input
            element="input"
            type="text"
            id="image"
            label="Image Url"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid image."
            onInput={inputHandler}
          />
        )}
        <Button type="submit" disabled={disabled || loading}>
          {isLogin ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
