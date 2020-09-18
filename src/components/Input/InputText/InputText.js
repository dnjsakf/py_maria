/** React **/
import React, { useState, useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Material-UI **/
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

/** Others **/
import clsx from 'clsx';

/* Custom Hooka */
const useStyles = makeStyles( theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  input: {
    padding: theme.spacing(1, 1),
  },
  label: {
    marginRight: 10,
  },
  labelPlacementStart: {
    margin: 'unset',
  }
}));


/** Main Component **/
const InputText = ( props )=>{
  /** Props **/
  const {
    className,
    onChange,
    ...rest
  } = props;
  
  /** State **/
  const [value, setValue] = useState("");

  /** Material Hook: Styles **/
  const classes = useStyles();
  
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
    <TextField
      InputProps={{
        classes: {
          input: classes.input
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      className={ clsx({
          [classes.root]: true
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
