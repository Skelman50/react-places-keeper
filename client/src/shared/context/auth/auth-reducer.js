import {
  SUCCESS_LOGIN,
  FETCH_ERROR,
  LOG_OUT,
  USER_LOADING,
  GET_USERS
} from "../types";

const handlers = {
  [USER_LOADING]: (state, { payload }) => ({
    ...state,
    loading: payload
  }),
  [SUCCESS_LOGIN]: (state, { payload }) => ({
    ...state,
    user: payload.user,
    token: payload.token,
    isUserLoaded: true,
    isLoggedIn: true
  }),
  [FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
    isUserLoaded: true
  }),
  [LOG_OUT]: (state, { payload }) => {
    return {
      ...payload,
      loading: false,
      isUserLoaded: true,
      users: state.users
    };
  },
  [GET_USERS]: (state, { payload }) => {
    return { ...state, users: payload.users };
  },
  DEFAULT: state => state
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
