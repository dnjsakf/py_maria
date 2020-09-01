/** React **/
import React from 'react';
import PropTypes from 'prop-types';

/** Others **/
import clsx from 'clsx';


/** Main Component **/
const BaseButton = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    fullWidth,
    ...rest
  } = props;
  
  /** Render **/
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

/** Prop Types **/
BaseButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  fullWidth: PropTypes.bool,
}

/** Default Props **/
BaseButton.defaultProps = {
  fullWidth: false,
}

/** Exports **/
export default BaseButton;
