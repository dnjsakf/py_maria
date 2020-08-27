/*
import React from 'react';
import PropTypes from 'prop'types';
import clsx from 'clsx';
*/

const GridRow = ( props )=>{
  const {
    className,
    children,
    center,
    right,
    ...rest
  } = props;
  
  return (
    <div 
      className={
        clsx({ 
          "row": true,
          "center": !!center,
          "right": !!right,
        }
        , className)}
    >
      { children }
    </div>
  );
}

GridRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  center: PropTypes.any,
  right: PropTypes.any,
}

GridRow.defaultProps = {

}

/*
export default GridRow;
*/