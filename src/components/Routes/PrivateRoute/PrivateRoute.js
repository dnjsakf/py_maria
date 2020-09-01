/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Redux: Reducer **/
import { selectors, actions } from '@reducers/authReducer';


/** Main Component **/
const PrivateRoute = ( props )=>{
  /** Props **/
  const {
    layout: Layout,
    component: Component,
    exact,
    isDesktop,
    ...rest
  } = props;

  /** Hooks: Router **/
  const history = useHistory();
  const location = useLocation();

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
        history.push(location.pathname);

      }).catch(( error )=>{
        console.error( error );
        localStorage.removeItem("access_token");
        dispatch(
          actions.signFailure()
        );
      });
    }
  },[]);

  /** Render **/
  return (
    <Route 
      exact={ exact }
      render={
        ( matchProps )=>(
          signed
          ? <Layout isDesktop={ isDesktop }>
              <Component { ...matchProps }/>
            </Layout>
          : <Redirect
              to={{
                pathname: "/signin", 
                state: { 
                  from: matchProps.location 
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
  layout: PropTypes.any,
  component: PropTypes.any,
}

/** Default Props **/
PrivateRoute.defaultProps = { }

/** Exports **/
export default PrivateRoute;
