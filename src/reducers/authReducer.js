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
  { // Default State
    signed: false,
    user: {
      user_id: null,
      user_name: null,
      user_nick: null,
      cell_phone: null,
      email: null,
    }
  },
  options,
);
