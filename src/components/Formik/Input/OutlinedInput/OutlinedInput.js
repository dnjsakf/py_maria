/* React */
import React, { useCallback }  from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';


/* Custom Hooks */
const useStyles = makeStyles(( theme )=>({
  root: {
    marginBottom: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(1, 1),
    width: "100%",
  },
}));

/* Main Component */
const OutlinedInput = ( props )=>{
  /* Props */
  const {
    form: { setFieldValue },
    field: { name },
    ...rest
  } = props;

  /* Hooks: Material-UI Styles  */
  const classes = useStyles();

  /* Handlers: When changed input value, update form data. */
  const onChange = useCallback(( event )=>{
    const { value } = event.target;

    setFieldValue(name, value);
  }, [ setFieldValue, name ]);

  /* Render */
  return (
    <TextField
      { ...rest }
      className={ classes.root }
      InputProps={{
        classes: {
          input: classes.input
        },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={ onChange }
    />
  )
}

/* Prop Types */
OutlinedInput.propTypes = {
  form: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired,
}

/* Default Props */
OutlinedInput.defaultProps = { }

/* Exports */
export default OutlinedInput;