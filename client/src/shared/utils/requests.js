import axios from "axios";
import { FETCH_ERROR } from "../context/types";

const baseUrl = "http://192.168.1.104:5000/api/";

export const request = async ({
  url,
  method = "GET",
  token = null,
  data = {}
}) => {
  const response = await axios(`${baseUrl}${url}`, {
    method,
    data,
    headers: { authorization: token ? `Bearer ${token}` : "" }
  });
  return { data: response.data };
};

export const getAuthData = formState => {
  const data = {};
  Object.keys(formState.inputs).forEach(key => {
    data[key] = formState.inputs[key].value;
  });
  return data;
};

export const errorHandler = (dispatch, error) => {
  dispatch({
    type: FETCH_ERROR,
    payload: error.response
      ? error.response.data.message
      : "Something went wrong"
  });
};
