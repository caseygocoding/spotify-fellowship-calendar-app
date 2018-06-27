const UPDATE_VIEW = 'UPDATE_VIEW';

export const updateView = view => {
  return {
    type: UPDATE_VIEW,
    view,
  };
};

export default function(state = 'monthly', action) {
  switch (action.type) {
    case UPDATE_VIEW:
      return action.view;
    default:
      return state;
  }
}
