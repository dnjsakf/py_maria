/** React **/
import React, { useRef, useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Redux **/
import { useDispatch } from 'react-redux';
import { actions } from '@reducers/authReducer';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';
import { InputText } from '@components/Input';
import { BaseButton } from '@components/Button';

/** Others **/
import axios from 'axios';


/** Constants **/
const initLoginData = {
  id: "",
  password: ""
}

/** Main Component **/
const SignIn = ( props )=>{
  /** Props **/
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

  /** State **/
  const [ formData, setFormData ] = useState(initLoginData)

  /** Handlers: Set formData state, when updated input value. **/
  const handleChange = useCallback(( event, value )=>{
    const name = event.target.name;
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  /** Handlers: Request Event. **/
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
  }, [ formData ]);
  
  /** Handlers: Change route to SignUp Page. **/
  const handleSignUp = useCallback( async ( event )=>{
    history.push("/signup");
  }, []);

  /** Render **/
  return (
    <GridRow
      fullHeight
      justify="center"
      alignItems="center"
    >
      <GridColumn
        xs={ 4 }
        style={{
          backgroundColor: "white"
        }}
      >
        <form { ...rest } >
          <GridRow
            justify="center"
            alignItems="center"
          >
            <GridColumn xs={ 10 }>
              <InputText
                fullWidth
                type="text"
                name="id"
                label="ID"
                placeholder="id"
                helperText=""
                varient="filled"
                onChange={ handleChange }
                error={ false }
              />
            </GridColumn>
          </GridRow>
          <GridRow
            justify="center"
            alignItems="center"
          >
            <GridColumn xs={ 10 }>
              <InputText
                fullWidth
                type="password"
                name="password"
                label="Password"
                placeholder="password"
                helperText="6~10자리"
                varient="filled"
                onChange={ handleChange }
                error={ false }
              />
            </GridColumn>
          </GridRow>
          <GridRow
            alignItems="center"
          >
            <GridColumn xs={ 6 }
              justify="center"
            >
              <BaseButton
                fullWidth
                onClick={ handleSignIn }
              >
                SignIn
              </BaseButton>
            </GridColumn>
            <GridColumn xs={ 6 }
              justify="center"
            >
              <BaseButton
                fullWidth
                onClick={ handleSignUp }
              >
                SignUp
              </BaseButton>
            </GridColumn>
          </GridRow>
        </form>
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
