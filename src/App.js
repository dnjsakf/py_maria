const { useEffect } = React;
const { BrowserRouter: Router, Switch, Redirect } = ReactRouterDOM;

const checkWidth = ( width )=>{
  if( width >= 1200 ){
    return "lg";
  } else if ( width >= 800 ){
    return "md";
  } else {
    return "sm";
  }
}

const App = ( props )=>{
  const [ isDesktop, setIsDesktop ] = useState(checkWidth(window.outerWidth));

  const handleResizeWindow = useCallback(( event )=>{
    setIsDesktop(checkWidth(window.outerWidth));
  }, []);

  useEffect(()=>{
    window.addEventListener("resize", handleResizeWindow, false);
  }, []);

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
          component={ MainHome }
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
