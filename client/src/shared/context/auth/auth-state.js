import React, { useReducer, useCallback } from "react";
import { UserContext } from "./auth-context";
import { userReducer } from "./auth-reducer";
import { request, errorHandler } from "../../utils/requests";
import { SUCCESS_LOGIN, LOG_OUT, USER_LOADING, GET_USERS } from "../types";

const UserState = ({ children }) => {
  const initialState = {
    user: {},
    isUserLoaded: false,
    users: [],
    loading: true,
    isLoggedIn: null,
    token: null
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadingUser = isloading => {
    dispatch({ type: USER_LOADING, payload: isloading });
  };

  const login = async data => {
    try {
      loadingUser(true);
      const response = await request({
        url: "users/login",
        data,
        method: "POST"
      });
      dispatch({ type: SUCCESS_LOGIN, payload: response.data });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingUser(false);
    }
  };

  const logout = () => {
    dispatch({ type: LOG_OUT, payload: initialState });
    localStorage.removeItem("token");
  };

  const getUsers = useCallback(async () => {
    try {
      loadingUser(true);
      const response = await request({ url: "users" });
      dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingUser(false);
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      loadingUser(true);
      const token = localStorage.getItem("token");
      const response = await request({ token, url: "users/load" });
      dispatch({ type: SUCCESS_LOGIN, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingUser(false);
    }
  }, []);

  const signup = async data => {
    try {
      loadingUser(true);
      const response = await request({
        url: "users/signup",
        data,
        method: "POST"
      });
      dispatch({ type: SUCCESS_LOGIN, payload: response.data });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingUser(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ ...state, login, logout, loadUser, getUsers, signup }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
