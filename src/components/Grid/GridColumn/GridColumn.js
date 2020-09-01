/** React **/
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Others **/
import clsx from 'clsx';


/** Main Component **/
const GridColumn = forwardRef(( props, ref )=>{
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
          "col": true,
          "w1": !!rest.w1,
          "w2": !!rest.w2,
          "w3": !!rest.w3,
          "w4": !!rest.w4,
          "w5": !!rest.w5,
          "w6": !!rest.w6,
          "w7": !!rest.w7,
          "w8": !!rest.w8,
          "w9": !!rest.w9,
          "w10": !!rest.w10,
          "w11": !!rest.w11,
          "w12": !!rest.w12,
          "center": !!center,
        }, 
        className)
      }
      style={ style }
    >
      { children }
    </div>
  );
});

/** Prop Types **/
GridColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  center: PropTypes.any,
  right: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
GridColumn.defaultProps = { }

/** Exports **/
export default GridColumn;
