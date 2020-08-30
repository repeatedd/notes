import { GET_NOTE, ADD_NOTE, DELETE_NOTE, NOTES_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getNote = () => (dispatch, getState) => {
  dispatch(setNotesLoading());
  axios
    .get("/api/notes", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_NOTE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteNote = (_id) => (dispatch, getState) => {
  axios
    .delete(`/api/notes/${_id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_NOTE,
        payload: _id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addNote = (note) => (dispatch, getState) => {
  axios
    .post("/api/notes", note, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_NOTE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setNotesLoading = () => {
  return {
    type: NOTES_LOADING,
  };
};
