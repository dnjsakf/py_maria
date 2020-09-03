/** React **/
import React, { useRef, useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Redux **/
import { useDispatch } from 'react-redux';
import { actions } from '@reducers/authReducer';

/** Others **/
import axios from 'axios';

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
const ReSign = ( props )=>{
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
  const dispatch = useDispatch();
  
  /** State **/
  const [ formData, setFormData ] = useState(initFormData);
  
  /** Handlers: Set formData state, when updated input value. **/
  const handleChange = useCallback(( event, value )=>{    
    const name = event.target.name;
    setFormData(( state )=>({
      ...state,
      [name]: value
    }));
  }, []);

  /** Handlers: Request Event. **/
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
        actions.signFailure()
      );
    }).catch(( error )=>{
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    });
  }, [ formData ]);
  
  /** Render **/
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

/** Prop Types **/
ReSign.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  action: PropTypes.string,
  method: PropTypes.string,
  onSubmit: PropTypes.func,
}

/** Default Props **/
ReSign.defaultProps = { }

/** Exports **/
export default ReSign;
