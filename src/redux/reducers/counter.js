import { types } from './../actions';

const { USER_LOGIN, USER_LOGIN_ERROR, LOADING, USER_SIGN_OUT, USER_SIGN_OUT_ERROR } = types;

const initialState = {
  attributes: null,
  idToken: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  const { attributes, idToken, error } = action;

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        attributes,
        idToken,
        loading: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        error,
        idToken,
        loading: false,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        attributes: null,
        idToken: null,
        loading: false,
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
