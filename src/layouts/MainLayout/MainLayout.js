/*
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'cslx';
*/

/*
import { GridRow, GridColumn } from '@components/Grid';
import MainHeader from './MainHaeder';
*/

const { useRef } = React;

const MainLayout = ( props )=>{
  const {
    className,
    children,
    isDesktop,
    ...rest
  } = props;

  const layoutRef = useRef();
  const [ open, setOpen ] = useState( isDesktop != "sm" );

  const handleOpenMenu = useCallback(( event )=>{
    setOpen(true);
  }, []);
  const handleCloseMenu = useCallback(( event )=>{
    setOpen(false);
  }, []);

  useEffect(()=>{
    layoutRef.current.addEventListener("click", handleCloseMenu, false);
  }, []);

  useEffect(()=>{
    setOpen( isDesktop != "sm" );
  }, [ isDesktop ]);
  
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
            paddingLeft: (open ? "250px" : ""),
            overflow: "scroll"
          }}
        >
          { children }
        </MainBody>
      </section>
    </div>  
  );
}

MainLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

MainLayout.defaultProps = {
  
}

/*
export default MainLayout;
*/