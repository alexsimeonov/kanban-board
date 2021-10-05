import axios from 'axios';
import ActionTypes from './action-types';

export const getColumns = () => (dispatch) => {
  axios.get('http://localhost:3000/columns')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_COLUMNS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addColumn = (name) => (dispatch) => {
  axios.post('http://localhost:3000/columns', {
    name,
  }).then((res) => {
    dispatch({
      type: ActionTypes.ADD_COLUMN,
      payload: res.data,
    });
  }).catch((err) => console.log(err));
};

export const editColumn = (id, name) => (dispatch) => {
  axios.put(`http://localhost:3000/columns/${id}`, {
    name,
  })
    .then((res) => {
      dispatch({
        type: ActionTypes.EDIT_COLUMN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteColumn = (id) => (dispatch) => {
  axios.delete(`http://localhost:3000/columns/${id}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_COLUMN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};