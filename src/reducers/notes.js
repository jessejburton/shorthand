export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
