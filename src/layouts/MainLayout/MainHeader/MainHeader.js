const { useCallback } = React;
const { useHistory } = ReactRouterDOM;
const { useDispatch, useSelector } = ReactRedux;

const MainHeader = ( props )=>{
  const {
    className,
    children,
    ...rest
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();
  const signed = useSelector(authSelectors.getSigned);
  const user = useSelector(authSelectors.getUser);
  
  const handleRedirectSignIn = useCallback(( event )=>{
    history.push("/signin");
  }, []);

  const handleSignOut = useCallback(( event )=>{
    event.preventDefault();
    
    axios({
      method: "POST",
      url: "/security/signout",
    }).then(( resp )=>{
      localStorage.removeItem("access_token");
      dispatch(
        authActions.signFailure()
      );
    }).catch(( error )=>{
      localStorage.removeItem("access_token");
      dispatch(
        authActions.signFailure()
      );
    });
  }, []);
  
  return (
    <header
      { ...rest }
      className={ className }
    >
      <GridRow right style={{ height: "100%" }}>
      {
        signed
        ? (
            <React.Fragment>
              <GridColumn w1 center>
                <span><strong>{ user.user_nick }</strong></span>
              </GridColumn>
              <GridColumn w1 center>
                <BaseButton onClick={ handleSignOut }>SignOut</BaseButton>
              </GridColumn>
            </React.Fragment>
          )
        : (
            <GridColumn w1 center>
              <BaseButton onClick={ handleRedirectSignIn }>SignIn</BaseButton>
            </GridColumn>
          )
      }
      {
        children && (
          <GridColumn center w2>
            { children }
          </GridColumn>
        )
      }
      </GridRow>
    </header>
  );
}