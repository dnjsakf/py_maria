const { useEffect } = React;
const { BrowserRouter: Router, Switch, Redirect } = ReactRouterDOM;

const App = ( props )=>{
  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/signin"
          layout={ MainLayout }
          component={ SignIn }
        />
        <PublicRoute
          exact
          path="/"
          layout={ MainLayout }
          component={ MainHome }
        />
        <PrivateRoute
          exact
          path="/board"
          layout={ MainLayout }
          component={ Board }
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
