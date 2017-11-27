import { mainData } from '../../assets';

import {
	AUTH_SET_USER
} from '../actions'

const initialState = {
  user: null
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {
   	case AUTH_SET_USER:
			return {
				...state,
				user: action.payload
			}
    default:
      return state
  }
}

export default authReducer;

export const setUser = payload => ({
	type: AUTH_SET_USER,
	payload
})