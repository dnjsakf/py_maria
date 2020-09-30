/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { Route, Redirect } from 'react-router-dom';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Redux: Reducer **/
import { selectors, actions } from '@reducers/authReducer';

/** Others **/
import axios from 'axios';

/** Main Component **/
const PrivateRoute = ( props )=>{
  /** Props **/
  const {
    component: Component,
    exact,
    ...rest
  } = props;

  /** Hooks: Redux **/
  const dispatch = useDispatch();
  const signed = useSelector(selectors.getSigned);

  /** Side Effects **/
  useEffect(()=>{
    const access_token = localStorage.getItem("access_token");
    if( access_token ){
      axios({
        method: "POST",
        url: "/security/signcheck",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
          "Authorization": "Bearer "+access_token
        }),
      }).then(( resp )=>{
        if( !resp.data.success ){
          throw new Error(resp.data.message||"Signed Failure");
        }
        localStorage.setItem("access_token", resp.data.access_token);
        dispatch(
          actions.signSuccess({
            user: resp.data.user
          })
        );
      }).catch(( error )=>{
        console.error( error );
        localStorage.removeItem("access_token");
        dispatch(
          actions.signFailure()
        );
      });
    }
  },[ Component ]);

  /** Render **/
  return (
    <Route 
      exact={ exact }
      render={
        ( matchProps )=>(
          signed
          ? <Component { ...matchProps } />
          : <Redirect
              to={{
                pathname: "/signin", 
                state: { 
                  from: matchProps.location,
                }
              }}
            />
        )
      }
    />
  );
}

/** Prop Types **/
PrivateRoute.propTypes = {
  component: PropTypes.any,
}

/** Default Props **/
PrivateRoute.defaultProps = { }

/** Exports **/
export default PrivateRoute;
