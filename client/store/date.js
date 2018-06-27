const UPDATE_CURRENT_DATE = 'UPDATE_CURRENT_DATE';

export const updateSelectedDate = date => {
  return {
    type: UPDATE_CURRENT_DATE,
    date,
  };
};

export default function(state = new Date(), action) {
  switch (action.type) {
    case UPDATE_CURRENT_DATE:
      return action.date;
    default:
      return state;
  }
}
