export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const userLoginAction = () => {
  return {
    type: USER_LOGIN
  };
};

export const userLogoutAction = () => {
  return {
    type: USER_LOGOUT
  };
};
