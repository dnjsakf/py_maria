/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';


/** Main Component **/
const Board = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    style,
    ...rest
  } = props;

  /** Render **/
  return (
    <h3>Board</h3>
  );
}

/** Prop Types **/
Board.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
Board.defaultProps = { }

/** Exports **/
export default Board;
