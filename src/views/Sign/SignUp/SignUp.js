/** React **/
import React, { useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Others **/
import axios from 'axios';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';
import { InputText } from '@components/Input';
import { BaseButton } from '@components/Button';


/** Constants **/
const initUserSignUpData = {
  id: "",
  password: "",
  password_chk: "",
  name: "",
  nickname: "",
  email: "",
  mobile: "",
}

/** Main Component **/
const SignUp = ( props )=>{
  const {
    className,
    children,
    style,
    history,
    location,
    match,
    staticContext,
    ...rest
  } = props;

  /** State **/
  const [ formData, setFormData ] = useState(initUserSignUpData);

  /** Handlers: Set formData state, when updated input value. **/
  const handleChange = useCallback(( event, value )=>{  
    const name = event.target.name;
    
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  /** Handlers: Request Event. **/
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

      history.push("/signin");
    }).catch(( error )=>{
      console.error( error );
    });
  }, [ formData ]);

  /** Render **/
  return (
    <form
      { ...rest }
    >
      <GridRow center>
        <GridColumn w10>
          <InputText
            fullWidth
            type="text"
            name="id"
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
            name="password"
            placeholder="password"
            onChange={ handleChange }
          />
        </GridColumn>
        <GridColumn w5>
          <InputText
            fullWidth
            type="password"
            name="password_chk"
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
            name="name"
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
            name="nickname"
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
            name="mobile"
            placeholder="mobile"
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

/** Prop Types **/
SignUp.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  
  history: PropTypes.any,
  location: PropTypes.any,
  match: PropTypes.any,
  staticContext: PropTypes.any,
  
  action: PropTypes.string,
  method: PropTypes.string,
  onSubmit: PropTypes.func,
}

/** Default Props **/
SignUp.defaultProps = { }

/** Exports **/
export default SignUp;
