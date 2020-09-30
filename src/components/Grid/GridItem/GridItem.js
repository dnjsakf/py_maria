/* React */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';

/* Others */
import clsx from 'clsx';


/* Custom Hooks */
const useStyles = makeStyles({
  root: {
  },
  fullHeight: {
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  }
});

/* Main Component */
const GridItem = forwardRef(( props, ref )=>{
  /* Props */
  const {
    className,
    children,
    fullHeight,
    fullWidth,
    ...rest
  } = props;

  /* Hooks: Material-UI Styles */
  const classes = useStyles();

  /* Render */
  return (
    <Grid item
      className={ clsx({
        [classes.root]: true,
        [classes.fullHeight]: !!fullHeight,
        [classes.fullWidth]: !!fullWidth,
      }, className) }
      { ...rest }
    >
      { children }
    </Grid>
  );
});

/* Prop Types */
GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  alignContent: PropTypes.oneOf([
    'stretch' //default
    , 'center'
    , 'flex-start'
    , 'flex-end'
    , 'space-between'
    , 'space-around'
  ]),
  alignItems: PropTypes.oneOf([
    'stretch'   //default
    , 'flex-start'
    , 'center'
    , 'flex-end'
    , 'baseline'
  ]),
  justify: PropTypes.oneOf([
    'flex-start'  //default
    , 'center'
    , 'flex-end'
    , 'space-between'
    , 'space-around'
    , 'space-evenly'
  ]),
  lg: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  md: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  sm: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  xl: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  xs: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  xs: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  spacing: PropTypes.oneOf(Array.from(Array(12).keys()).map(n=>++n)),
  
}

/* Default Props */
GridItem.defaultProps = { }

/* Exports */
export default GridItem;
