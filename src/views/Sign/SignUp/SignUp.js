/* React */
import React, { useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';

/* Others */
import axios from 'axios';

/* Custom Components */
import { GridContainer, GridItem } from '@components/Grid';
import { InputText } from '@components/Input';
import { BaseButton } from '@components/Button';
import clsx from 'clsx';

/* Custom Hooks */
import { useResultAlert } from '@hooks/Alert';


/* Custom Hooks */
const useStyle = makeStyles(( theme )=>({
  root: {
    padding: theme.spacing(5, 0),
    backgroundColor: "white"
  }
}));

/* Constants */
const initUserSignUpData = {
  id: "",
  password: "",
  password_chk: "",
  name: "",
  nickname: "",
  email: "",
  mobile: "",
}

/* Main Component */
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

  /* State */
  const [ formData, setFormData ] = useState(initUserSignUpData);

  /* Hooks: Material-UI Styles */
  const classes = useStyle();

  /* Hooks: Notistack */
  const handleSnackbar = useResultAlert();

  /* Handlers: Set formData state, when updated input value. */
  const handleChange = useCallback(( event, value )=>{  
    const name = event.target.name;
    
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  /* Handlers: Request Event. */
  const handleSubmit = useCallback(( event )=>{
    event.preventDefault();

    axios({
      method: "POST",
      url: "/security/signup",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      },
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

  /* Render */
  return (
    <GridContainer
      fullHeight
      justify="center"
      alignItems="center"
    >
      <GridItem
        xs={ 8 }
        style={{
          backgroundColor: "white"
        }}
        className={ clsx({
          [classes.root]: true
        })}
      >
        <form
          { ...rest }
        >
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="id"
                placeholder="id"
                label="ID"
                helperText="숫자,문자(50자리)"
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 5 }>
              <InputText
                fullWidth
                type="password"
                name="password"
                placeholder="password"
                label="Password"
                helperText="모든문자(6~10자리)"
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
            <GridItem xs={ 5 }>
              <InputText
                fullWidth
                type="password"
                name="password_chk"
                placeholder="password check"
                label="Password Check"
                helperText=""
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="name"
                placeholder="name"
                label="Name"
                helperText="모든문자(50자리)"
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="nickname"
                placeholder="nickname"
                label="Nickname"
                helperText="모든문자(50자리)"
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="email"
                placeholder="email"
                label="Email"
                helperText=""
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer
            justify="center"
          >
            <GridItem xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="mobile"
                placeholder="mobile"
                label="Mobile"
                helperText=""
                error={ false }
                onChange={ handleChange }
              />
            </GridItem>
          </GridContainer>
          <GridContainer 
            justify="center"
          >
            <GridItem xs={ 5 }>
              <BaseButton
                fullWidth
                onClick={ handleSubmit }
              >
                SignUp
              </BaseButton>
            </GridItem>
          </GridContainer>
        </form>
    </GridItem>
  </GridContainer>
  );
}

/* Prop Types */
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

/* Default Props */
SignUp.defaultProps = { }

/* Exports */
export default SignUp;
