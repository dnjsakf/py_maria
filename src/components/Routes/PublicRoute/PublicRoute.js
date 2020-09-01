/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { Route } from 'react-router-dom';


/** Main Component **/
const PublicRoute = ( props )=>{
  /** Props **/
  const {
    path,
    layout: Layout,
    component: Component,
    exact,
    isDesktop,
    ...rest
  } = props;
  
  /** Render **/
  return (
    <Route
      { ...rest }
      path={ path }
      exact={ exact }
      render={
        ( matchProps )=>(
          <Layout isDesktop={ isDesktop }>
            <Component {...matchProps}/>
          </Layout>
        )
      }
    />
  );
}

/** Prop Types **/
PublicRoute.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
}

/** Default Props **/
PublicRoute.defaultProps = { }

/** Exports **/
export default PublicRoute;
