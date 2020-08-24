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

const authOptions = {
  prefix: "auth",
  namespace: "/",
}

/** Actions **/
const authActions = createActions({
    [authTypes.SIGN_SUCCESS]: [
      success => success,
      success => { type: "value", success }
    ],
    [authTypes.SIGN_FAILURE]: [
      success => success,
      success => { type: "value", success }
    ]
  },
  authOptions
);

/** Reducer **/
const authReducer = handleActions(
  new Map([
    [
      authActions.signSuccess
      , ( state, action ) => (
        Object.assign({}, state, {
          ...action.payload
        })
      )
    ],
    [
      authActions.signFailure
      , ( state, action ) => (
        Object.assign({}, state, {
          ...action.payload
        })
      )
    ],
  ]),
  {
    // Default State
    success: false
  },
  authOptions,
);

/** Store **/
const {
  combineReducers,
  createStore
} = Redux;

const rootReducer = combineReducers({
  auth: authReducer  
});

/** Store **/
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
