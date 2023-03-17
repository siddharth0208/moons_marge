import {
  REGISTER_DATA,
  REGISTER_RANDOM_DATA,
  UPDATE_DATA,
  CHECK_INTERNET,
  SET_APP_STATE,
} from './actionTypes';
import {AppState} from 'react-native';

const initialState = {
  usersData: [],
  randomData: [],
  isConnected: false,
  priviousAppState: null,
  currentAppState: null,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DATA:
      return {
        ...state,
        usersData: [...state.usersData, {...action.data}],
      };
    case REGISTER_RANDOM_DATA:
      return {
        ...state,
        randomData: action.data,
      };
    case UPDATE_DATA: {
      let updatedUserDetails = state.randomData.map(user => {
        // if (user.id === action.userId) {
        //   // console.log('userIdMatch', action.userId, 'count', action.payload);
        //   return {
        //     ...user,
        //     count: action.payload,
        //   };
        // } else {
        //   // console.log('userIdMisMatch', user.id, 'count', user.count);
        //   return user;
        // }
        return {
          ...user,
          count: user.count + 1,
        };
      });

      return {
        ...state,
        randomData: updatedUserDetails,
      };
    }
    case CHECK_INTERNET:
      return {
        ...state,
        isConnected: action.data,
      };
    case SET_APP_STATE:
      return {
        ...state,
        priviousAppState: state.currentAppState,
        currentAppState: action.data,
      };
    default:
      return state;
  }
};
