/** React **/
import React from 'react';
import PropTypes from 'prop-types';

/** Material-UI **/
import Button from '@material-ui/core/Button/Button';

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
    <Button
      className={
        clsx({
          "w12": !!fullWidth
        }, className)
      }
      { ...rest }
    >
      { children }
    </Button>
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
