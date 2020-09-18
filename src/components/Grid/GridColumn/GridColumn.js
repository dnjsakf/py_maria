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
const GridColumn = forwardRef(( props, ref )=>{
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
    <Grid item
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
GridColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

/** Default Props **/
GridColumn.defaultProps = { }

/** Exports **/
export default GridColumn;
