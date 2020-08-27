/** Actions **/
const {
  createActions,
  handleActions
} = ReduxActions;

/** Types **/
const authTypes = {
  SIGN_SUCCESS: "SIGN_SUCCESS",
  SIGN_FAILURE: "SIGN_FAILURE",
}

/** ActionOptions **/
const authOptions = {
  prefix: "auth",
  namespace: "/",
}

/** Actions **/
const authActions = createActions({
    [authTypes.SIGN_SUCCESS]: [
      payload => payload,
      payload => { type: "value", payload }
    ],
    [authTypes.SIGN_FAILURE]: [
      payload => payload,
      payload => { type: "value", payload }
    ]
  },
  authOptions
);

/** Reducer **/
const authReducer = handleActions(
  new Map([
    [
      authActions.signSuccess
      , ( state, action ) => {
        return Object.assign({}, state, {
          signed: true,
          user: action.payload.user,
        });
      }
    ],
    [
      authActions.signFailure
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
  authOptions,
);

/** Action Selector **/
const authSelectors = {
  getSigned: ({ auth })=>( auth.signed ),
  getUser: ({ auth })=>( auth.user ),
}