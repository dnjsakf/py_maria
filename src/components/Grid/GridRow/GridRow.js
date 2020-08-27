/*
import React from 'react';
import PropTypes from 'prop'types';
import clsx from 'clsx';
*/

const { forwardRef } = React;

const GridRow = forwardRef(( props, ref )=>{
  const {
    className,
    children,
    center,
    right,
    style,
    ...rest
  } = props;
  
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

GridRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  center: PropTypes.any,
  right: PropTypes.any,
  style: PropTypes.any,
}

GridRow.defaultProps = {

}

/*
export default GridRow;
*/