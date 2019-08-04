import { types } from '../action/type';

const initialState = {
  message: null,
  count: 0,
};

const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DEFAULT: {
      return {
        ...state,
        message: 'Hello redux',
        count: state.count + 1,
      };
    }

    default:
      return state;
  }
};

export default defaultReducer;
