/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';


/** Main Component **/
const MainBody = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    style,
    ...rest
  } = props;

  /** Render **/
  return (
    <div
      className={ className }
      style={ style }
    >
      { children }
    </div>
  );
}

/** Prop Types **/
MainBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
MainBody.defaultProps = { }

/** Exports **/
export default MainBody;
