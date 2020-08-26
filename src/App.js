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

  const dispatch = useDispatch();
  const signed = useSelector(authSelectors.getSigned);
  
  const [ userId, setUserId ] = useState("");
  const [ userPwd, setUserPwd ] = useState("");

  const handleChange = useCallback(( event, value )=>{    
    if( event.target.name == "user_id" ){
      setUserId(value);
    } else if ( event.target.name == "user_pwd" ) {
      setUserPwd(value);
    }
  }, []);

  const handleSignIn = useCallback( async ( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/signin",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams({
        user_id: userId,
        user_pwd: userPwd
      })
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
    }).catch(( error )=>{
      console.error( error );
      localStorage.removeItem("access_token");
      dispatch(
        authActions.signFailure()
      );
    });
  }, [ userId, userPwd ]);
  
  if( signed ){
    console.log( signed );
    <Redirect exact to="/" />
  }
  
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

  const dispatch = useDispatch();
  
  const [ userId, setUserId ] = useState("");
  const [ userPwd, setUserPwd ] = useState("");
  const [ userPwdChk, setUserPwdChk ] = useState("");
  const [ userName, setUserName ] = useState("");
  const [ userNick, setUserNick ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ cellPhone, setcellPhone ] = useState("");

  const handleChange = useCallback(( event, value )=>{    
    if( event.target.name == "user_id" ){
      setUserId(value);
    } else if ( event.target.name == "user_pwd" ){
      setUserPwd(value);
    } else if ( event.target.name == "user_pwd_chk" ){
      setUserPwdChk(value);
    } else if ( event.target.name == "user_name" ){
      setUserName(value);
    } else if ( event.target.name == "user_nick" ){
      setUserNick(value);
    } else if ( event.target.name == "email" ){
      setEmail(value);
    } else if ( event.target.name == "cell_phone" ){
      setcellPhone(value);
    }
  }, []);

  const handleSubmit = useCallback(( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/signup",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams({
        user_id: userId,
        user_pwd: userPwd,
        user_pwd_chk: userPwdChk,
        user_name: userName,
        user_nick: userNick,
        email: email,
        cell_phone: cellPhone
      })
    }).then(( resp )=>{
      console.log( resp.data );
      if( !resp.data.success ){
        throw new Error("SignUp Failure");
      }
      localStorage.setItem("access_token", resp.data.access_token);
      // dispatch(
      //   authActions.signSuccess({
      //     user: resp.data.user
      //   })
      // );
    }).catch(( error )=>{
      console.error( error );
      // localStorage.removeItem("access_token");
      // dispatch(
      //   authActions.signFailure()
      // );
    });


    console.log({
      userId, userPwd, userPwdChk, userName, userNick, cellPhone, email
    })
  }, [ userId, userPwd, userPwdChk, userName, userNick, cellPhone, email ]);

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
  
  const [ userId, setUserId ] = useState("");
  const [ userPwd, setUserPwd ] = useState("");

  const handleChange = useCallback(( event, value )=>{    
    if( event.target.name == "user_id" ){
      setUserId(value);
    } else if ( event.target.name == "user_pwd" ) {
      setUserPwd(value);
    }
  }, []);

  const handleReSign = useCallback( async ( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/resign",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams({
        user_id: userId,
        user_pwd: userPwd
      })
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
  }, [ userId, userPwd ]);
  
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

const SignCheck = ( props )=>{
  const {
    ...rest
  } = props;

  const dispatch = useDispatch();

  const signed = useSelector(authSelectors.getSigned);
  const user = useSelector(authSelectors.getUser);

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
          throw new Error("Signed Failure");
        }
        localStorage.setItem("access_token", resp.data.access_token);
        dispatch(
          authActions.signSuccess({
            user: resp.data.user
          })
        );
      }).catch(( error )=>{
        console.error( error );
        localStorage.removeItem("access_token");
        dispatch(
          authActions.signFailure()
        );
      });
    }
  },[]);
  
  
  if( signed ){
    return (
      <React.Fragment>
        <h1>Hello~{ user.user_nick }</h1>
        <Button onClick={ handleSignOut }>SignOut</Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <SignIn />
        <SignUp />
      </React.Fragment>
    );
  }
}

const MainHader = ( props )=>{
  const {
    className,
    ...rest
  } = props;

  const dispatch = useDispatch();
  const signed = useSelector(authSelectors.getSigned);
  const user = useSelector(authSelectors.getUser);
  
  const history = useHistory();
  
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
    <h3>Home</h3>
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

const App = ( props )=>{  
  return (
    <React.StrictMode>
      <StoreProvider store={ store }>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/signin" />
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
          </Switch>
        </Router>
      </StoreProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));