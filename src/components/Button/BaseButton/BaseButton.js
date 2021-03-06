/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';

/* Others */
import clsx from 'clsx';


/* Custom Hooks */
const useStyles = makeStyles(( theme )=>({
  fullWidth: {
    width: "100%",
  }
}));

/* Main Component */
const BaseButton = ( props )=>{
  /* Props */
  const {
    className,
    children,
    fullWidth,
    ...rest
  } = props;

  /* Hooks: Material-UI Styles */
  const classes = useStyles();
  
  /* Render */
  return (
    <Button
      { ...rest }
      className={
        clsx({
          [classes.fullWidth]: !!fullWidth,
        }, className)
      }
    >
      { children }
    </Button>
  );
}

/* Prop Types */
BaseButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  fullWidth: PropTypes.any,
}

/* Default Props */
BaseButton.defaultProps = { }

/* Exports */
export default BaseButton;
