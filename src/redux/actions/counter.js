import { createTypes } from 'redux-action-types';
import { Auth } from 'aws-amplify';

export const types = createTypes(
  'counter/',
  'USER_LOGIN',
  'USER_LOGIN_ERROR',
  'USER_SIGN_UP',
  'USER_SIGN_UP_ERROR',
  'USER_SIGN_OUT',
  'USER_SIGN_OUT_ERROR',
  'LOADING',
  'SAVE_DATA_FORM',
  'CANCEL_VALIDATE'
);

export const login = ({ username, password }) => async dispatch => {
  dispatch({ type: types.LOADING });

  Auth.signIn(username, password)
    .then(user => {
      console.log('TCL: user', user);
      dispatch({
        type: types.USER_LOGIN,
        login_success: true,
        signUp_success: false,
        attributes: user.attributes,
        idToken: user.signInUserSession.accessToken.jwtToken,
      });
    })
    .catch(error => {
      console.log('TCL: user', error);
      dispatch({
        type: types.USER_LOGIN_ERROR,
        error,
      });
    });
};

export const signUp = ({ username, password, email }) => async dispatch => {
  dispatch({ type: types.LOADING });
  Auth.signUp({ username, password, attributes: { email } })
    .then(data => {
      console.log('TCL: data', data);
      dispatch({
        type: types.USER_SIGN_UP,
        user_signUp: data,
        signUp_success: true,
        username,
        password,
      });
    })
    .catch(error => {
      dispatch({
        type: types.USER_SIGN_UP_ERROR,
        error,
      });
    });
};

export const signOut = () => async dispatch => {
  dispatch({ type: types.LOADING });
  Auth.signOut()
    .then(data => {
      console.log('TCL: data', data);
      dispatch({
        type: types.USER_SIGN_OUT,
        login_success: false,
      });
    })
    .catch(error => {
      dispatch({
        type: types.USER_SIGN_OUT_ERROR,
        error,
      });
    });
};

export const saveDataForm = dataForm => async dispatch => {
  dispatch({
    type: types.SAVE_DATA_FORM,
    dataForm,
  });
};

export const cancelValidate = dataForm => async dispatch => {
  dispatch({
    type: types.CANCEL_VALIDATE,
    signUp_success: false,
  });
};

export const confirmSignUp = (username, code, password) => async dispatch => {
  dispatch({ type: types.LOADING });
  Auth.confirmSignUp(username, code)
    .then(data => {
      Auth.signIn(username, password).then(user => {
        console.log('TCL: user', user);
        dispatch({
          type: types.USER_LOGIN,
          login_success: true,
          signUp_success: false,
          attributes: user.attributes,
          idToken: user.signInUserSession.accessToken.jwtToken,
        });
      });
    })
    .catch(error => {
      console.log('TCL: error', error);
    });
};
