/** React **/
import React, { useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Others **/
import clsx from 'clsx';


/** Main Component **/
const InputText = ( props )=>{
  /** Props **/
  const {
    className,
    fullWidth,
    onChange,
    ...rest
  } = props;
  
  /** State **/
  const [value, setValue] = useState("");
  
  /** Handlers **/
  const handleChange = useCallback(( event )=>{
    const v = event.target.value;
    
    setValue(v);
    
    if( onChange ){
      onChange( event, v );
    }
  }, []);

  /** Render **/
  return (
    <input
      className={
        clsx({
          "w12": !!fullWidth
        }, className)        
      }
      value={ value }
      onChange={ handleChange }
      { ...rest }
    />
  );
}

/** Prop Types **/
InputText.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func
}

/** Default Props **/
InputText.defaultProps = {
  fullWidth: false,
}

/** Exports **/
export default InputText;
