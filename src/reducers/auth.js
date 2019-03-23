export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        ...action.user
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
