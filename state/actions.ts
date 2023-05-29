export const LOGIN = "LOGIN";

export const LOGOUT = "LOGOUT";

export const LOAD_LOGGED_IN = "LOAD_LOGGED_IN";

export const READ_USER_DETAILS = "READ_USER_DETAILS";

export const FINISH_ONBOARD = "FINISH_ONBOARD";

export const loginAction = (name: string, uid: string, isNewUser: boolean) => ({
  type: LOGIN,
  payload: { userName: name, uid: uid, isNewUser: isNewUser ?? false },
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const finishOnboard = () => ({
  type: FINISH_ONBOARD,
});

export const readUserDetails = (name: number, isYouth: boolean) => ({
  type: READ_USER_DETAILS,
  payload: { name, isYouth },
});
