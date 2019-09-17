import { createTypes } from 'redux-action-types';
import { Auth } from 'aws-amplify';

export const types = createTypes(
  'counter/',
  'USER_LOGIN',
  'USER_LOGIN_ERROR',
  'USER_SIGN_OUT',
  'USER_SIGN_OUT_ERROR',
  'LOADING'
);

export const login = ({ username, password }) => async dispatch => {
  dispatch({ type: types.LOADING });
  try {
    const user = await Auth.signIn(username, password);
    dispatch({
      type: types.USER_LOGIN,
      attributes: user.attributes,
      idToken: user.signInUserSession.accessToken.jwtToken,
    });
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_ERROR,
      error,
    });
  }
};

export const signOut = () => async dispatch => {
  dispatch({ type: types.LOADING });
  try {
    const sign_out = await Auth.signOut();
    dispatch({
      type: types.USER_SIGN_OUT,
      sign_out,
    });
  } catch (error) {
    dispatch({
      type: types.USER_SIGN_OUT_ERROR,
      error,
    });
  }
};