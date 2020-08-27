/*
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
*/

const BaseButton = ( props )=>{
  const {
    className,
    children,
    fullWidth,
    ...rest
  } = props;
  
  return (
    <button 
      className={
        clsx({
          "w12": !!fullWidth
        }, className)
      }
      { ...rest }
    >
      { children }
    </button>
  );
}

BaseButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  fullWidth: PropTypes.bool,
}

BaseButton.defaultProps = {
  fullWidth: false,
}

/*
export default BaseButton;
*/