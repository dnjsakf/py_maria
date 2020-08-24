const { useState, useEffect, useCallback } = React;

const GridRow = ( props )=>{
  const {
    className,
    children,
    center,
    ...rest
  } = props;
  
  return (
    <div 
      className={
        clsx({ 
          "row": true,
          "center": !!center,
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
          "w12": !!rest.w12
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
    ...rest
  } = props;
  
  const [ userId, setUserId ] = useState("");
  const [ userPwd, setUserPwd ] = useState("");
  
  const handleChange = useCallback(( event, value )=>{    
    if( event.target.name == "user_id" ){
      setUserId(value);
    } else if ( event.target.name == "user_pwd" ) {
      setUserPwd(value);
    }
  }, []);
  
  const handleSubmit = useCallback( async ( event )=>{
    event.preventDefault();
    
    const resp = await axios({
      method: "POST",
      url: "/security/signin",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      }),
      data: new URLSearchParams({
        user_id: userId,
        user_pwd: userPwd
      })
    });
    
    console.log( resp.data );
    //.then( resp => console.log( resp ) )
    //.catch( error => console.error( error ) );
    
  }, [ userId, userPwd ]);
  
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
            onClick={ handleSubmit }
          >
            SignIn
          </Button>
        </GridItem>
      </GridRow>
    </form>
  );
}

const App = ( props )=>{
  
  return (
    <React.StrictMode>
      <GridRow>
        <GridItem w2>
          <SignIn />
        </GridItem>
      </GridRow>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));