/* eslint-disable import/prefer-default-export */
import { types } from './type';

export const triggerDefault = () => dispatch => {
  dispatch({
    type: types.DEFAULT,
  });
};
