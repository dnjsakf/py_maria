/** Actions **/
import { createActions, handleActions } from 'redux-actions';

/** Types **/
export const types = {
  SIGN_SUCCESS: "SIGN_SUCCESS",
  SIGN_FAILURE: "SIGN_FAILURE",
}

/** Options **/
export const options = {
  prefix: "auth",
  namespace: "/",
}

/** Init State **/
const initState = {
  signed: false,
  user: {
    id: "",
    name: "",
    nickname: "",
    email: "",
    mobile: "",
  }
}

/** Actions **/
export const actions = createActions({
    [types.SIGN_SUCCESS]: [
      payload => payload,
      payload => { type: "value", payload }
    ],
    [types.SIGN_FAILURE]: [
      payload => payload,
      payload => { type: "value", payload }
    ]
  },
  options
);

/** Selectors **/
export const selectors = {
  getSigned: ({ auth })=>( auth.signed ),
  getUser: ({ auth })=>( auth.user ),
}

/** Reducer **/
export default handleActions(
  new Map([
    [
      actions.signSuccess
      , ( state, action ) => {
        return Object.assign({}, state, {
          signed: true,
          user: action.payload.user,
        });
      }
    ],
    [
      actions.signFailure
      , ( state, action ) => {
        return Object.assign({}, state, {
          signed: false,
          user: null
        });
      }
    ],
  ]),
  initState,
  options,
);
