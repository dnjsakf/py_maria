/*
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'cslx';
*/

/*
import { GridRow, GridColumn } from '@components/Grid';
import MainHeader from './MainHaeder';
*/

const MainLayout = ( props )=>{
  const {
    className,
    children,
    ...rest
  } = props;
  
  return (
    <React.Fragment>
      <MainHeader
        style={{
          height: "65px",
          backgroundColor: "lightgreen",
        }}
      />
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
            paddingLeft: "250px",
            overflow: "scroll"
          }}
        >
          { children }
        </MainBody>
      </section>
    </React.Fragment>  
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