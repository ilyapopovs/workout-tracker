import { ACTION_LOGOUT, ACTION_SET_USER } from './actionTypes'

const initialState = {
  user: null,
}

export function authReducer<A extends { type: string; payload?: any }>(
  state = initialState,
  action: A,
) {
  switch (action.type) {
    case ACTION_SET_USER:
      return { ...state, user: action.payload }
    case ACTION_LOGOUT:
      // do something
      return { ...state, user: null }
    default:
      return state
  }
}
