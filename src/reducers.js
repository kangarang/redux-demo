import { SET_NAME, SET_AGE } from './actions'

const initialState = {
  age: 0,
  name: '',
}

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AGE:
      return {
        ...state,
        age: action.payload,
      }
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}
