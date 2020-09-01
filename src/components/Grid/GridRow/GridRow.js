/** React **/
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Others **/
import clsx from 'clsx';


/** Main Component **/
const GridRow = forwardRef(( props, ref )=>{
  /** Props **/
  const {
    className,
    children,
    center,
    right,
    style,
    ...rest
  } = props;
  
  /** Render **/
  return (
    <div 
      ref={ ref }
      className={
        clsx({ 
          "row": true,
          "center": !!center,
          "right": !!right,
        }
        , className)}
      style={ style }
    >
      { children }
    </div>
  );
});

/** Prop Types **/
GridRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  center: PropTypes.any,
  right: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
GridRow.defaultProps = { }

/** Exports **/
export default GridRow;
