// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Provider as StoreProvider } from 'react-reudx';
// import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const { useState, useEffect, useCallback } = React;
const { useDispatch, useSelector } = ReactRedux;
const { Provider: StoreProvider } = ReactRedux;
const { BrowserRouter: Router, Switch, Redirect } = ReactRouterDOM;
const { Route, Link } = ReactRouterDOM;
const { useHistory, useLocation } = ReactRouterDOM;

/**
 * Common Components
 */
const GridRow = ( props )=>{
  const {
    className,
    children,
    center,
    right,
    ...rest
  } = props;
  
  return (
    <div 
      className={
        clsx({ 
          "row": true,
          "center": !!center,
          "right": !!right,
        }
        , className)}
    >
      { children }
    </div>
  );
}

const GridItem = ( props )=>{
  const {
    className,
    children,
    center,
    right,
    ...rest
  } = props;
  
  return (
    <div 
      className={
        clsx({
          "col": true,
          "w1": !!rest.w1,
          "w2": !!rest.w2,
          "w3": !!rest.w3,
          "w4": !!rest.w4,
          "w5": !!rest.w5,
          "w6": !!rest.w6,
          "w7": !!rest.w7,
          "w8": !!rest.w8,
          "w9": !!rest.w9,
          "w10": !!rest.w10,
          "w11": !!rest.w11,
          "w12": !!rest.w12,
          "center": !!center,
        }, 
        className)
      }
    >
      { children }
    </div>
  );
}

const Input = ( props )=>{
  const {
    className,
    fullWidth,
    onChange,
    ...rest
  } = props;
  
  const [value, setValue] = useState("");
  
  const handleChange = useCallback(( event )=>{
    const v = event.target.value;
    
    setValue(v);
    
    if( onChange ){
      onChange( event, v );
    }
  }, []);
  
  return (
    <input
      className={
        clsx({
          "w12": !!fullWidth
        }, className)        
      }
      value={ value }
      onChange={ handleChange }
      { ...rest }
    />
  );
}

const Button = ( props )=>{
  const {
    className,
    children,
    fullWidth,
    ...rest
  } = props;
  
  return (
    <button 
      className={
        clsx({
          "w12": !!fullWidth
        }, className)
      }
      { ...rest }
    >
      { children }
    </button>
  );
}

const SignIn = ( props )=>{
  const {
    className,
    action,
    method,
    onSubmit,
    ...rest
  } = props;

  const history = useHistory();

  const dispatch = useDispatch();
  const signed = useSelector(authSelectors.getSigned);

  const [ formData, setFormData ] = useState({
    user_id: "",
    user_pwd: ""
  })

  const handleChange = useCallback(( event, value )=>{
    const name = event.target.name;
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  const handleSignIn = useCallback( async ( event )=>{
    event.preventDefault();

    console.log( formData );

    axios({
      method: "POST",
      url: "/security/signin",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams( formData )
    }).then(( resp )=>{
      console.log( resp.data );
      if( !resp.data.success ){
        throw new Error("Signed Failure");
      }
      localStorage.setItem("access_token", resp.data.access_token);
      dispatch(
        authActions.signSuccess({
          user: resp.data.user
        })
      );
      history.push("/");

    }).catch(( error )=>{
      console.error( error );
      localStorage.removeItem("access_token");
      dispatch(
        authActions.signFailure()
      );
    });
  }, [ formData ]);

  return (
    <form
      action={ action }
      method={ method }
      onSubmit={ onSubmit }
    >
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_id"
            placeholder="id"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="password"
            name="user_pwd"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w6>
          <Button
            fullWidth
            onClick={ handleSignIn }
          >
            SignIn
          </Button>
        </GridItem>
      </GridRow>
    </form>
  );
}

const SignUp = ( props )=>{
  const {
    className,
    ...rest
  } = props;

  const [ formData, setFormData ] = useState({
    user_id: "",
    user_pwd: "",
    user_pdw_chk: "",
    user_name: "",
    user_nick: "",
    email: "",
    cell_phone: "",
  });

  const handleChange = useCallback(( event, value )=>{  
    const name = event.target.name;
    
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/signup",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams( formData )
    }).then(( resp )=>{
      console.log( resp.data );
      if( !resp.data.success ){
        throw new Error("SignUp Failure");
      }
      localStorage.setItem("access_token", resp.data.access_token);
    }).catch(( error )=>{
      console.error( error );
    });
  }, [ formData ]);

  return (
    <form
      { ...rest }
    >
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_id"
            placeholder="id"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w5>
          <Input
            fullWidth
            type="password"
            name="user_pwd"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridItem>
        <GridItem w5>
          <Input
            fullWidth
            type="password"
            name="user_pwd_chk"
            placeholder="password check"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_name"
            placeholder="name"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_nick"
            placeholder="nickname"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="email"
            placeholder="email"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_nick"
            placeholder="cell_phone"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w6>
          <Button
            fullWidth
            onClick={ handleSubmit }
          >
            SignUp
          </Button>
        </GridItem>
      </GridRow>
    </form>
  );
}

const ReSign = ( props )=>{
  const {
    className,
    action,
    method,
    onSubmit,
    ...rest
  } = props;

  const dispatch = useDispatch();
  
  const [ formData, setFormData ] = useState({
    user_id: "",
    user_pwd: ""
  })

  const handleChange = useCallback(( event, value )=>{    
    const name = event.target.name;
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  const handleReSign = useCallback( async ( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/resign",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams( formData )
    }).then(( resp )=>{
      console.log( resp.data );
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
  }, [ formData ]);
  
  return (
    <form
      action={ action }
      method={ method }
      onSubmit={ onSubmit }
    >
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="text"
            name="user_id"
            placeholder="id"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w10>
          <Input
            fullWidth
            type="password"
            name="user_pwd"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridItem>
      </GridRow>
      <GridRow center>
        <GridItem w6>
          <Button
            fullWidth
            onClick={ handleReSign }
          >
            ReSign
          </Button>
        </GridItem>
      </GridRow>
    </form>
  );
}

const MainHader = ( props )=>{
  const {
    className,
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
      <GridRow right>
      {
        signed
        ? (
            <React.Fragment>
              <GridItem w1 center>
                <span><strong>{ user.user_nick }</strong></span>
              </GridItem>
              <GridItem w1 center>
                <Button onClick={ handleSignOut }>SignOut</Button>
              </GridItem>
            </React.Fragment>
          )
        : (
            <GridItem w1 center>
              <Button onClick={ handleRedirectSignIn }>SignIn</Button>
            </GridItem>
          )
      }
      </GridRow>
    </header>
  );
}

const MainHome = ( props )=>{
  return (
    <React.Fragment>
      <h3>Home</h3>
      <ul>
        <li><Link to="/board">Board</Link></li>
      </ul>
    </React.Fragment>
  );  
}

const Board = ( props )=>{
  return (
    <h3>Board</h3>
  );
}

const MainLayout = ( props )=>{
  const {
    className,
    children,
    ...rest
  } = props;
  
  return (
    <React.Fragment>
      <MainHader style={{
        height: "50px"
      }}/>
      <section>
        <GridRow center>
          <GridItem w4 center>
            { children }
          </GridItem>
        </GridRow>
      </section>
    </React.Fragment>  
  );
}

const MainRoute = ( props )=>{
  const {
    path,
    component: Component,
    exact,
    ...rest
  } = props;
  
  return (
    <Route
      { ...rest }
      path={ path }
      render={
        ( matchProps )=>(
          <MainLayout >
            <Component {...matchProps}/>
          </MainLayout>
        )
      }
    />
  );
}

const PrivateRoute = ( props )=>{
  const {
    component: Component,
    ...rest
  } = props;

  const signed = useSelector(authSelectors.getSigned);


  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

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
        ? <MainLayout >
            <Component {...matchProps}/>
          </MainLayout>
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

const App = ( props )=>{  
  return (
    <React.StrictMode>
      <StoreProvider store={ store }>
        <Router>
          <Switch>
            <MainRoute
              exact
              path="/signin"
              component={ SignIn }
            />
            <MainRoute
              exact
              path="/"
              component={ MainHome }
            />
            <PrivateRoute
              exact
              path="/board"
              component={ Board }
            />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </StoreProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));