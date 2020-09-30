/* React */
import React, { useRef, useState, useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import { makeStyles, useTheme } from '@material-ui/styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import { useMediaQuery } from '@material-ui/core';

/* Layout Components */
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';
import { MainSideBar } from './MainSideBar';

/* Custom Components */
import { BaseButton } from '@components/Button';

/* Ohters */
import clsx from 'clsx';


/* Custom Hooks */
const useStyles = makeStyles(( theme )=>({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  main: {
    height: "100%",
  },
  wrapper: {
    height: "100%",
  }
}));

/* Styled Components */
const Container = styled.div`
  height: 100%;
`;

const Section = styled.section`
  position: relative;
  height: 100%;
`;

/* Main Component */
const MainLayout = ( props )=>{
  /* Props */
  const {
    className,
    children,
    ...rest
  } = props;

  /* Refs */
  const layoutRef = useRef();
  
  /* State */
  const [ desktop, setDesktop ] = useState( isDesktop );
  const [ open, setOpen ] = useState( isDesktop != "sm" );

  /* Hooks: Material-UI Styles */
  const theme = useTheme();
  const classes = useStyles();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  /* Handlers: Open Menu */
  const handleOpenMenu = useCallback(( event )=>{
    setOpen(true);
  }, []);
  
  /* Handlers: Close Menu */
  const handleCloseMenu = useCallback(( event )=>{
    if( desktop == "sm" ){
      setOpen(false); 
    }
  }, [ desktop ]);

  /* Side Effects: Binding close menu event to ref */
  useEffect(()=>{
    layoutRef.current.addEventListener("click", handleCloseMenu, false);
  }, []);

  /* Side Effects: Open menu, when mounted component. */
  useEffect(()=>{
    console.log('layout:', desktop );
    
    setOpen( desktop != "sm" );
  }, [ desktop ]);
  
  /* Render */
  return (
    <div
      ref={ layoutRef }
      className={
        clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop
        }, 
        className)                 
      }
    >
      <MainHeader />
      <Section>
        <MainSideBar />
        <MainBody>
          { children }
        </MainBody>
      </Section>
    </div>  
  );
}

/* Prop Types */
MainLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

/* Default Props */
MainLayout.defaultProps = { }

/* Exports */
export default MainLayout;
