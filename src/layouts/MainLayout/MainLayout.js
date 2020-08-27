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
      <MainHeader style={{
        height: "50px"
      }}/>
      <MainBody>
        { children }
      </MainBody>
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