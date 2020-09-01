/** React **/
import React, { useRef, useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { useHistory } from 'react-router-dom';

/** Redux **/
import { useDispatch } from 'react-redux';
import { actions } from '@reducers/authReducer';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';
import { InputText } from '@components/Input';
import { BaseButton } from '@components/Button';


/** Constants **/
const initFormData = {
  user_id: "",
  user_pwd: ""
}

/** Main Component **/
const SignIn = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    style,
    action,
    method,
    onSubmit,
    ...rest
  } = props;

  /** Hooks: Router **/
  const history = useHistory();

  /** Hooks: Redux **/
  const dispatch = useDispatch();

  /** State **/
  const [ formData, setFormData ] = useState(initFormData)

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

  /** Render **/
  return (
    <GridRow
      center
      style={{
        height: "100%"
      }}
    >
      <GridColumn w12 center>
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
            <GridColumn w6>
              <BaseButton
                fullWidth
                onClick={ ()=>{
                  history.push("/signup")
                } }
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
  action: PropTypes.string,
  method: PropTypes.string,
  onSubmit: PropTypes.func,
}

/** Default Props **/
SignIn.defaultProps = { }

/** Exports **/
export default SignIn;
