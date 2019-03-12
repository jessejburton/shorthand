// Notes Reducer
const notesReducerDefaultState = [];
const notesReducer = (state = notesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [action.note, ...state]; // state.concat(action.note) returns a new array
    case 'REMOVE_NOTE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_NOTE':
      return state.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            ...action.updates
          };
        } else {
          return note;
        }
      });
    case 'SET_NOTES':
      return action.notes;
    default:
      return state;
  }
};

export default notesReducer;