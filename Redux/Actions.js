export const SET_TEXT = 'SET_TEXT';
export const TOGGLE_SHOW_STATE = 'TOGGLE_SHOW_STATE';

export const setText = (newText) => ({
  type: SET_TEXT,
  payload: newText,
});

export const show = () => ({
  type: TOGGLE_SHOW_STATE,
});
