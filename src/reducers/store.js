/** Redux **/
import { 
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';

/** Middleware **/
import { logger as loggerMiddleware } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/** Reducers **/
import authReducer from './authReducer';


const rootReducer = combineReducers({
  auth: authReducer  
});

/** Store **/
const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
  )
);

/** Exports **/
export default store;