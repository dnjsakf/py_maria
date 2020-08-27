/*
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
*/
const { useState, useCallback } = React;

const InputText = ( props )=>{
  const {
    className,
    fullWidth,
    onChange,
    ...rest
  } = props;
  
  const [value, setValue] = useState("");
  
  const handleChange = useCallback(( event )=>{
    const v = event.target.value;
    
    setValue(v);
    
    if( onChange ){
      onChange( event, v );
    }
  }, []);

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

InputText.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func
}

InputText.defaultProps = {
  fullWidth: false,
}

/*
export default InputText;
*/