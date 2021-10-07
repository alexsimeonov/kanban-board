import axios from 'axios';
import { toast } from 'react-toastify';
import ActionTypes from './action-types';

export const getColumns = () => (dispatch) => {
  axios.get('http://localhost:3000/columns')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_COLUMNS,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const addColumn = (name) => (dispatch) => {
  axios.post('http://localhost:3000/columns', {
    name,
  }).then((res) => {
    dispatch({
      type: ActionTypes.ADD_COLUMN,
      payload: res.data,
    });
  }).catch((err) => {
    toast(err.message, {
      theme: 'colored',
      type: 'error',
    });
  });
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
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const deleteColumn = (id) => (dispatch) => {
  axios.delete(`http://localhost:3000/columns/${id}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_COLUMN,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const getCards = () => (dispatch) => {
  axios.get('http://localhost:3000/cards')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_CARDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const getCardById = (id) => (dispatch) => {
  axios.get(`http://localhost:3000/cards/${id}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_CARD_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const addCard = (title, description, status) => (dispatch) => {
  axios.post('http://localhost:3000/cards', {
    title, description, status,
  })
    .then((res) => {
      dispatch({
        type: ActionTypes.ADD_CARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const editCard = (id, title, description, status, query) => (dispatch) => {
  let url = `http://localhost:3000/cards/${id}`;

  if (query) {
    url += query;
  }

  axios.put(url, {
    title, description, status,
  })
    .then((res) => {
      dispatch({
        type: ActionTypes.EDIT_CARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const deleteCard = (id) => (dispatch) => {
  axios.delete(`http://localhost:3000/cards/${id}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_CARD,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast(err.message, {
        theme: 'colored',
        type: 'error',
      });
    });
};

export const filterCards = (value) => (dispatch) => dispatch({
  type: ActionTypes.FILTER_CARDS,
  payload: value,
});
