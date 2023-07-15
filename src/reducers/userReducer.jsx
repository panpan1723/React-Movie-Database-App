import * as Actions from "../actions/userActions";

const initialState = {
  isLogin: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.USER_LOGIN:
      return {
        isLogin: true
      };
    case Actions.USER_LOGOUT:
      return {
        isLogin: false
      };
    default:
      return state;
  }
};

export default userReducer;
