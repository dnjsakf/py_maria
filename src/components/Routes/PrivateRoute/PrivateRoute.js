const { useEffect } = React;
const { Route, Redirect, useHistory, useLocation } = ReactRouterDOM;
const { useDispatch, useSelector } = ReactRedux;

const PrivateRoute = ( props )=>{
  const {
    layout: Layout,
    component: Component,
    ...rest
  } = props;

  const dispatch = useDispatch();
  const signed = useSelector(authSelectors.getSigned);

  const history = useHistory();
  const location = useLocation();

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
          authActions.signSuccess({
            user: resp.data.user
          })
        );
        history.push(location.pathname);

      }).catch(( error )=>{
        console.error( error );
        localStorage.removeItem("access_token");
        dispatch(
          authActions.signFailure()
        );
      });
    }
  },[]);

  return (
    <Route render={
      ( matchProps )=>(
        signed
        ? <Layout >
            <Component {...matchProps}/>
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
    }/>
  );
}