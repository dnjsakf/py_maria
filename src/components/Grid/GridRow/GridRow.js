/** React **/
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Material-UI **/
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';

/** Others **/
import clsx from 'clsx';

/** Custom Hooks **/
const useStyles = makeStyles({
  root: {
  },
  fullHeight: {
    height: "100%",
  },
});


/** Main Component **/
const GridRow = forwardRef(( props, ref )=>{
  /** Props **/
  const {
    className,
    children,
    fullHeight,
    ...rest
  } = props;

  /** Material Hooks: Styles **/
  const classes = useStyles();
  
  /** Render **/
  return (
    <Grid
      container
      className={ clsx({
        [classes.root]: true,
        [classes.fullHeight]: !!fullHeight,
      }, className) }
      { ...rest }
    >
      { children }
    </Grid>
  );
});

/** Prop Types **/
GridRow.propTypes = {
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
}

/** Default Props **/
GridRow.defaultProps = { }

/** Exports **/
export default GridRow;
