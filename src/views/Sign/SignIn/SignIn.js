
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
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="user_id"
            placeholder="id"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="password"
            name="user_pwd"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w6>
          <BaseButton
            fullWidth
            onClick={ handleSignIn }
          >
            SignIn
          </BaseButton>
        </GridColumn>
      </GridRow>
    </form>
  );
}