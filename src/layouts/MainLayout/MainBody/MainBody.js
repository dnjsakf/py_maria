/** React **/
import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Steyld **/
import styled from 'styled-components';

/** Material-UI **/
import { makeStyles } from '@material-ui/core/styles';

/** Others **/
import clsx from 'clsx';


/** Custom Hooks **/
const useStyles = makeStyles((theme)=>({
  root: { }
}));

/** Styled Components **/
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
  background-attachment: fixed;
`;

/** Main Component **/
const MainBody = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    style,
    ...rest
  } = props;

  /** Material-UI Hook: Styles **/
  const classes = useStyles();

  /** Render **/
  return (
    <Container
      className={
        clsx({
          [classes.root]: true
        }, className)
      }
    >
      { children }
    </Container>
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
