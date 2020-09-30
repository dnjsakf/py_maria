/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Steyld */
import styled from 'styled-components';


/* Styled Components */
const Container = styled.div`
  z-index: 100;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  background-image: url(/public/images/bg/background02.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  // background-attachment: fixed;
`;

/* Main Component */
const MainBody = ( props )=>{
  /* Props */
  const {
    className,
    children,
    ...rest
  } = props;

  /* Render */
  return (
    <Container className={ className }>
      { children }
    </Container>
  );
}

/* Prop Types */
MainBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

/* Default Props */
MainBody.defaultProps = { }

/* Exports */
export default MainBody;
