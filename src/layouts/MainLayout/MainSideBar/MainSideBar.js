/** React **/
import React, { useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { NavLink } from 'react-router-dom';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';


/** Main Component **/
const MainSideBar = ( props )=>{
  /** Props **/
  const {
    className,
    items,
    style,
    ...rest
  } = props;

  /** Render **/
  return (
    <div style={ style }>
      <GridRow center>
        <GridColumn>
          ProFiles
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn center w14>
          <ul>
          {
            items && items.map(( item )=>(
              <li key={ item.id }>
                <NavLink
                  to={ item.link }
                  activeClassName="active-menu"
                  activeStyle={{
                    color: "red",
                  }}
                >
                { item.label }
                </NavLink>
              </li>
            ))
          }
          </ul>
        </GridColumn>
      </GridRow>
    </div>
  );
}

/** Prop Types **/
MainSideBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  style: PropTypes.any,
}

/** Default Props **/
MainSideBar.defaultProps = {
  items: [
    {
      id: "Board",
      label: "Board",
      link: "/board",
    },
    {
      id: "Chat",
      label: "Chat",
      link: "/chat",
    }
  ]
}

/** Exports **/
export default MainSideBar;
