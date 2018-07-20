export const SET_AGE = 'SET_AGE'
export const SET_NAME = 'SET_NAME'

export function setAge(age) {
  return {
    type: SET_AGE,
    payload: age,
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name,
  }
}
