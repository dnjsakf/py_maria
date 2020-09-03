/** React **/
import React, { useState, useCallback, useEffect } from 'react';

/** Router **/
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

/** Layouts **/
import { MainLayout } from '@layouts';

/** Views **/
import { Home, Board, Chat } from '@views';
import { SignIn, SignUp, ReSign } from '@views/Sign';

/** Custom Components **/
import { PublicRoute, PrivateRoute } from '@components/Routes';


/** Functions: Check Windows Width **/
const checkWidth = ( width )=>{
  if( width >= 1200 ){
    return "lg";
  } else if ( width >= 800 ){
    return "md";
  } else {
    return "sm";
  }
}

/** Main Component **/
const App = ( props )=>{
  /** State **/
  const [ isDesktop, setIsDesktop ] = useState(checkWidth(window.outerWidth));

  /** Handlers: Set isDesktop state, when updated window size. **/
  const handleResizeWindow = useCallback(( event )=>{
    setIsDesktop(checkWidth(window.outerWidth));
  }, []);

  /** Side Effects: Binding window resize event to window object. **/
  useEffect(()=>{
    window.addEventListener("resize", handleResizeWindow, false);
  }, []);

  /** Render **/
  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/signin"
          layout={ MainLayout }
          component={ SignIn }
          isDesktop={ isDesktop }
        />
        <PublicRoute
          exact
          path="/signup"
          layout={ MainLayout }
          component={ SignUp }
          isDesktop={ isDesktop }
        />
        <PublicRoute
          exact
          path="/"
          layout={ MainLayout }
          component={ Home }
          isDesktop={ isDesktop }
        />
        <PrivateRoute
          exact
          path="/board"
          layout={ MainLayout }
          component={ Board }
          isDesktop={ isDesktop }
        />
        <PrivateRoute
          exact
          path="/chat"
          layout={ MainLayout }
          component={ Chat }
          isDesktop={ isDesktop }
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

/** Prop Types **/
App.propTypes = { }

/** Default Props **/
App.defaultProps = { }

/** Exports **/
export default App;
