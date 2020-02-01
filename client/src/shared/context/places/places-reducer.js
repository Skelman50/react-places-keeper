import {
  SUCCESS_GET_PLACES,
  PLACES_LOADING,
  FETCH_ERROR,
  SUCCESS_GET_PLACE,
  UPDATE_PLACE_SUCCESS,
  ADD_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from "../types";

const handlers = {
  [SUCCESS_GET_PLACES]: (state, { payload }) => ({
    ...state,
    error: null,
    places: payload.places
  }),
  [SUCCESS_GET_PLACE]: (state, { payload }) => ({
    ...state,
    error: null,
    place: payload.place
  }),
  [UPDATE_PLACE_SUCCESS]: (state, { payload }) => ({
    ...state,
    error: null,
    place: payload.place
  }),
  [ADD_PLACE_SUCCESS]: (state, { payload }) => ({
    ...state,
    error: null,
    place: payload.place
  }),
  [DELETE_PLACE_SUCCESS]: (state, { payload }) => ({
    ...state,
    error: null,
    places: payload.places
  }),
  [FETCH_ERROR]: (state, { payload }) => {
    return {
      ...state,
      places: [],
      place: null,
      error: payload
    };
  },
  [PLACES_LOADING]: (state, { payload }) => {
    return { ...state, loading: payload };
  },
  DEFAULT: state => state
};

export const placesReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
