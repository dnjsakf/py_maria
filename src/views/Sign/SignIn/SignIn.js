/* React */
import React, { useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { useDispatch } from 'react-redux';

/* Redux: Reducer */
import { actions } from '@reducers/authReducer';

/* Styled */
import theme from '@theme';
import styled from 'styled-components';
/* Formik */
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

/* Custom Components */
import Box from '@material-ui/core/Box';
import { BaseButton } from '@components/Button';
import { GridContainer, GridItem } from '@components/Grid';
import { OutlinedInput } from '@components/Formik/Input/OutlinedInput';
import { SubmitButton } from '@components/Formik/Button/SubmitButton';

/* Others */
import axios from 'axios';


/* Styled Components */
const FormBox = styled(Box)`
  padding: ${ theme.spacing(4, 4, 2, 4) };
  box-shadow: 0 0 5px 5px darkgray;
`;

/* Custom Functions */
function validateID( value ) {
  if ( !value ) {
    return "ID is required";
  } else if ( value.length < 4 ) {
    return "ID must be 4 characters at minimum";
  } else if ( value.length > 25 ){
    return "ID must be 25 characters at maximum";
  }
  return false;
}
function validatePassword( value ) {
  if ( !value ) {
    return "Password is required";
  } else if ( value.length < 4 ) {
    return "Password must be 4 characters at minimum";
  } else if ( value.length > 12 ){
    return "Password must be 12 characters at maximum";
  }
  return false;
}

/* Constants */
const initLoginData = {
  id: "",
  password: ""
}

/* Main Component */
const SignIn = ( props )=>{
  /* Props 
   * history: Redirect로 이동된 경우, useHistory를 사용하면 undefined.
   */
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

  /* Hooks: Redux */
  const dispatch = useDispatch();

  /* Handlers: Submit form. */
  const handleSubmit = useCallback(( formData, { setSubmitting } )=>{
    axios({
      method: "POST",
      url: "/security/signin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      },
      data: new URLSearchParams( formData )
    }).then(( resp )=>{
      if( !resp.data.success ){
        throw new Error(resp.data.message||"Signed Failure");
      }

      // Save access token to localStorage.
      const access_token = resp.data.access_token;
      if( access_token ){
        localStorage.setItem("access_token", access_token);
        dispatch(
          actions.signSuccess({
            user: resp.data.user
          })
        );
        // Move to Home.
        history.push("/");
      } else {
        throw new Eerror("No access token");
      }
    }).catch(( error )=>{
      console.error( error );
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    });
  }, [ history ]);

  /* Handlers: Change route to SignUp Page. */
  const handleSignUp = useCallback(( event )=>{
    history.push("/signup");
  }, [ history ]);

  /* Render */
  return (
    <GridContainer
      justify="center"
      alignItems="center"
      fullHeight
    >
      <GridItem xs={ 4 }>
        <FormBox
          color="black"
          bgcolor="white"
        >
          <Formik
            initialValues={ initLoginData }
            onSubmit={ handleSubmit }
          >
            {
              ({ errors, touched  })=>(
                <Form>
                  <GridContainer
                    justify="center"
                    alignItems="center"
                    direction="row"
                  >
                    <GridItem xs={ 12 }>
                      <Field
                        component={ OutlinedInput }
                        validate={ validateID }
                        name="id"
                        placeholder="Enter ID"
                        variant="outlined"
                        label="ID"
                        error={ !!(touched.id && errors.id) }
                        helperText={ touched.id && errors.id }
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={ 12 }>
                      <Field
                        component={ OutlinedInput }
                        validate={ validatePassword }
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        variant="outlined"
                        label="Password"
                        // Submit 했을때 오류 확인.
                        error={ !!(touched.password && errors.password) }
                        helperText={ touched.password && errors.password }
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer
                    alignItems="center"
                    justify="center"
                  >
                    <GridItem>
                      <SubmitButton>Sign In</SubmitButton>
                    </GridItem>
                    <GridItem>
                      <BaseButton onClick={ handleSignUp }>Sign Up</BaseButton>
                    </GridItem>
                  </GridContainer>
                </Form>
              )
            }
          </Formik>
        </FormBox>
      </GridItem>
    </GridContainer>
  );
}

/* Prop Types */
SignIn.propTypes = {
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
SignIn.defaultProps = { }

/* Exports */
export default SignIn;
