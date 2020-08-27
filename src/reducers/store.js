/** Store **/
const {
  combineReducers,
  createStore,
  applyMiddleware,
} = Redux;

const rootReducer = combineReducers({
  auth: authReducer  
});

/** MiddleWare **/
const { logger: loggerMiddleware } = reduxLogger;
const { default: thunkMiddleware } = ReduxThunk;

/** Store **/
const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
  )
);
