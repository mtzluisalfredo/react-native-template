import { types } from './../actions';

const {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  LOADING,
  USER_SIGN_OUT,
  USER_SIGN_OUT_ERROR,
  USER_SIGN_UP,
  USER_SIGN_UP_ERROR,
  SAVE_DATA_FORM,
  CANCEL_VALIDATE,
} = types;

const initialState = {
  username: null,
  password: null,
  signUp_success: false,
  login_success: false,
  user_signUp: null,
  attributes: null,
  idToken: null,
  error: null,
  dataForm: null,
  loading: false,
};

export default (state = initialState, action) => {
  const {
    attributes,
    idToken,
    error,
    user_signUp,
    login_success,
    signUp_success,
    dataForm,
    username,
    password,
  } = action;

  switch (action.type) {
    case CANCEL_VALIDATE:
      return {
        ...state,
        signUp_success,
      };
    case SAVE_DATA_FORM:
      return {
        ...state,
        dataForm,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_UP:
      return {
        ...state,
        user_signUp,
        signUp_success,
        username,
        password,
        loading: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        attributes,
        idToken,
        login_success,
        loading: false,
      };
    case USER_SIGN_UP_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        error,
        loading: false,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        attributes: null,
        idToken: null,
        loading: false,
        login_success: false,
      };
    case USER_SIGN_OUT_ERROR:
      return {
        ...state,
        attributes: null,
        idToken: null,
        loading: false,
      };
    default:
      return state;
  }
};
