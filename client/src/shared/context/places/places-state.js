import React, { useReducer, useCallback, useContext } from "react";
import { request, errorHandler } from "../../utils/requests";
import {
  PLACES_LOADING,
  SUCCESS_GET_PLACES,
  SUCCESS_GET_PLACE,
  UPDATE_PLACE_SUCCESS,
  ADD_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from "../types";
import { PlacesContext } from "./places-context";
import { placesReducer } from "./places-reducer";
import { UserContext } from "../auth/auth-context";

const PlacesState = ({ children }) => {
  const initialState = {
    places: [],
    place: null,
    loading: false,
    error: null
  };
  const [state, dispatch] = useReducer(placesReducer, initialState);
  const { token } = useContext(UserContext);

  const loadingPlaces = isloading => {
    dispatch({ type: PLACES_LOADING, payload: isloading });
  };

  const getPlaces = useCallback(
    async userId => {
      try {
        loadingPlaces(true);
        const response = await request({
          url: `places/user/${userId}`,
          token
        });
        dispatch({ type: SUCCESS_GET_PLACES, payload: response.data });
      } catch (error) {
        errorHandler(dispatch, error);
      } finally {
        loadingPlaces(false);
      }
    },
    [token]
  );

  const getPlace = useCallback(
    async placeId => {
      try {
        loadingPlaces(true);
        const response = await request({
          url: `places/${placeId}`,
          token
        });
        dispatch({ type: SUCCESS_GET_PLACE, payload: response.data });
      } catch (error) {
        errorHandler(dispatch, error);
      } finally {
        loadingPlaces(false);
      }
    },
    [token]
  );

  const editPlace = async (data, placeId) => {
    try {
      loadingPlaces(true);
      const response = await request({
        url: `places/${placeId}`,
        token,
        data,
        method: "PATCH"
      });
      dispatch({ type: UPDATE_PLACE_SUCCESS, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingPlaces(false);
    }
  };

  const addPlace = async data => {
    try {
      loadingPlaces(true);
      const response = await request({
        url: `places`,
        token,
        data,
        method: "POST"
      });
      dispatch({ type: ADD_PLACE_SUCCESS, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingPlaces(false);
    }
  };

  const deletePlace = async placeId => {
    try {
      loadingPlaces(true);
      const response = await request({
        url: `places/${placeId}`,
        token,
        method: "DELETE"
      });
      dispatch({ type: DELETE_PLACE_SUCCESS, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);
    } finally {
      loadingPlaces(false);
    }
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        loadingPlaces,
        getPlaces,
        getPlace,
        editPlace,
        addPlace,
        deletePlace
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesState;
