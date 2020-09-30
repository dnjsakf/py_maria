/** React **/
import React, { useState, useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Redux **/
import { useDispatch } from 'react-redux';
import { actions } from '@reducers/authReducer';

/** Styled **/
import theme from '@theme';
import styled from 'styled-components';

/** Material-UI **/
import Input from '@material-ui/core/Input';

/** Formik **/
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/** Custom Components **/
import Box from '@material-ui/core/Box';
import { GridRow, GridColumn } from '@components/Grid';

/** Others **/
import axios from 'axios';


/** Styled Components **/
const FormBox = styled(Box)`
  padding: ${ theme.spacing(3, 2) };
  box-shadow: 0 0 5px 5px darkgray;
`;

/** Custom Functions **/
function validateID(value) {
  if ( !value ) {
    return "ID is required";
  } else if ( value.length < 4 ) {
    return "ID must be 4 characters at minimum";
  } else if ( value.length > 25 ){
    return "ID must be 25 characters at maximum";
  }
  return false;
}
function validatePassword(value) {
  if ( !value ) {
    return "Password is required";
  } else if ( value.length < 4 ) {
    return "Password must be 4 characters at minimum";
  } else if ( value.length > 12 ){
    return "Password must be 12 characters at maximum";
  }
  return false;
}


/** Constants **/
const initLoginData = {
  id: "",
  password: ""
}

/** Main Component **/
const SignIn = ( props )=>{
  /** Props 
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

  /** Hooks: Redux **/
  const dispatch = useDispatch();

  /** Handlers: Submit form. **/
  const handleSubmit = useCallback(( formData, { setSubmitting } )=>{
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
        actions.signSuccess({
          user: resp.data.user
        })
      );
      history.push("/");
    }).catch(( error )=>{
      console.error( error );
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    });
  });

  /** Handlers: Change route to SignUp Page. **/
  const handleSignUp = useCallback(( event )=>{
    history.push("/signup");
  }, []);

  /** Side Effect: Mount & Unmount **/
  useEffect(()=>{
    // console.log( "Mounted Sign" );
  }, []);

  /** Render **/
  return (
    <GridRow
      justify="center"
      alignItems="center"
      fullHeight
    >
      <GridColumn xs={ 4 }>
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
                  <GridRow
                    justify="center"
                    alignItems="center"
                  >
                    <GridColumn xs={ 10 }>
                      <Field
                        name="id"
                        placeholder="Enter ID"
                        className={`form-control ${
                          touched.id && errors.id ? "is-invalid" : ""
                        }`}
                        validate={ validateID }
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn xs={ 12 }>
                      <ErrorMessage name="id" />
                    </GridColumn>
                  </GridRow>
                  <GridRow
                    justify="center"
                    alignItems="center"
                  >
                    <GridColumn xs={ 10 }>
                      <Field 
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        className={
                          `form-control ${
                            touched.id && errors.id ? "is-invalid" : ""
                        }`}
                        validate={ validatePassword }
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn xs={ 12 }>
                      <ErrorMessage name="password" />
                    </GridColumn>
                  </GridRow>
                  <GridRow
                    alignItems="center"
                  >
                    <GridColumn xs={ 6 }>
                      <button type="submit">SignIn</button>
                    </GridColumn>
                    <GridColumn xs={ 6 }>
                      <button>SignUp</button>
                    </GridColumn>
                  </GridRow>
                </Form>
              )
            }
          </Formik>
        </FormBox>
      </GridColumn>
    </GridRow>
  );
}

/** Prop Types **/
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

/** Default Props **/
SignIn.defaultProps = { }

/** Exports **/
export default SignIn;
