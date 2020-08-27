
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
        <GridColumn w5>
          <InputText
            fullWidth
            type="password"
            name="user_pwd"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridColumn>
        <GridColumn w5>
          <InputText
            fullWidth
            type="password"
            name="user_pwd_chk"
            placeholder="password check"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="user_name"
            placeholder="name"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="user_nick"
            placeholder="nickname"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="email"
            placeholder="email"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="user_nick"
            placeholder="cell_phone"
            onChange={ handleChange }
          />
        </GridColumn>
      </GridRow>
      <GridRow center>
        <GridColumn w6>
          <BaseButton
            fullWidth
            onClick={ handleSubmit }
          >
            SignUp
          </BaseButton>
        </GridColumn>
      </GridRow>
    </form>
  );
}
