/** React **/
import React, { useRef, useState, useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { useHistory } from 'react-router-dom';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Layout Components **/
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';
import { MainSideBar } from './MainSideBar';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';
import { BaseButton } from '@components/Button';

/** Main Component **/
const MainLayout = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    isDesktop,
    ...rest
  } = props;

  /** Refs **/
  const layoutRef = useRef();
  
  /** State **/
  const [ desktop, setDesktop ] = useState( isDesktop );
  const [ open, setOpen ] = useState( isDesktop != "sm" );

  /** Handlers: Open Menu **/
  const handleOpenMenu = useCallback(( event )=>{
    setOpen(true);
  }, []);
  
  /** Handlers: Close Menu **/
  const handleCloseMenu = useCallback(( event )=>{
    console.log( desktop );
    if( desktop == "sm" ){
      setOpen(false); 
    }
  }, [ desktop ]);

  /** Side Effects: Binding close menu event to ref **/
  useEffect(()=>{
    layoutRef.current.addEventListener("click", handleCloseMenu, false);
  }, []);

  /** Side Effects: Open menu, when mounted component. **/
  useEffect(()=>{
    console.log('layout:', desktop );
    
    setOpen( desktop != "sm" );
  }, [ desktop ]);
  
  
  /** Render **/
  return (
    <div 
      ref={ layoutRef }
      style={{
        height: "100%"
      }}
    >
      <MainHeader
        style={{
          height: "65px",
          backgroundColor: "lightgreen",
        }}
      >
        <BaseButton onClick={ handleOpenMenu }>Menu</BaseButton>
      </MainHeader>
      <section
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <MainSideBar
          style={{
            zIndex: 200,
            position: "absolute",
            width: "250px",
            top: (open ? ( isDesktop == "sm" ? "-65px": "0" ) : "0"),
            left: (open ? "0" : "-250px"),
            height: "100%",
            backgroundColor: "lightcoral"
          }}
        />
        <MainBody
          style={{
            zIndex: 100,
            position: "relative",
            width: "100%",
            height: "100%",
            paddingLeft: (open ? isDesktop == "sm" ? "0" : "250px" : ""),
            overflow: "scroll"
          }}
        >
          { children }
        </MainBody>
      </section>
    </div>  
  );
}

/** Prop Types **/
MainLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

/** Default Props **/
MainLayout.defaultProps = { }

/** Exports **/
export default MainLayout;
