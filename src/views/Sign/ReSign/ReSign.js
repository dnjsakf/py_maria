
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
            onClick={ handleReSign }
          >
            ReSign
          </BaseButton>
        </GridColumn>
      </GridRow>
    </form>
  );
}
