/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { Link } from 'react-router-dom';


/** Main Component **/
const Home = ( props )=>{
  /** Props **/
  const {
    classname,
    children,
    style,
    ...rest
  } = props;

  /** Render **/
  return (
    <React.Fragment>
      <h3>Home</h3>
      <ul>
        <li><Link to="/board">Board</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
    </React.Fragment>
  );
}

/** Prop Types **/
Home.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
Home.defaultProps = { }

/** Exports **/
export default Home;
