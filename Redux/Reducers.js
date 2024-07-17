import { combineReducers } from 'redux';
import { SET_TEXT, TOGGLE_SHOW_STATE } from './Actions';

const textReducer = (state = 'Type here', action) => {
  switch (action.type) {
    case SET_TEXT:
      return action.payload;
    default:
      return state;
  }
};

const visibilityReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_STATE:
      return !state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  text: textReducer,
  isComponentVisible: visibilityReducer,
});

export default rootReducer;