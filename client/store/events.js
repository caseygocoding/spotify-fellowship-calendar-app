import axios from 'axios';
const GET_EVENTS = 'GET_EVENT';
const POST_EVENT = 'POST_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const PUT_EVENT = 'PUT_EVENT';

const defaultEvent = [];

export const getEvents = events => {
  return {
    type: GET_EVENTS,
    events,
  };
};

export const postEvent = event => {
  return {
    type: POST_EVENT,
    event,
  };
};

export const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    id,
  };
};

export const updateEvent = event => {
  return {
    type: PUT_EVENT,
    event,
  };
};

export const getAllEvents = (month, year) => dispatch => {
  return axios
    .get(`/api/events/${month}/${year}`, { month: month, year: year })
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events));
    })
    .catch(err => console.log(err));
};

export const addEvent = eventDetails => async dispatch => {
  try {
    const res = await axios.post(`/api/events`, eventDetails);
    dispatch(postEvent(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteSingleEvent = id => dispatch => {
  return axios
    .delete(`/api/events/${id}`)
    .then(res => res.data)
    .then(() => {
      dispatch(deleteEvent(id));
    })
    .catch(err => console.log(err));
};

export const updateSingleEvent = (id, eventObj) => dispatch => {
  return axios
    .put(`/api/events/${id}`, eventObj)
    .then(res => res.data)
    .then(event => {
      dispatch(updateEvent(event));
    })
    .catch(err => console.log(err));
};

export default function(state = defaultEvent, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case POST_EVENT:
      return [...state, action.event];
    case PUT_EVENT:
      return state
        .filter(event => event.id !== action.event.id)
        .concat(action.event);
    case DELETE_EVENT:
      return state.filter(event => event.id !== action.id);
    default:
      return state;
  }
}
