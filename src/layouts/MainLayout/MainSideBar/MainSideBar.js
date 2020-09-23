/** React **/
import React, { useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { NavLink } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/** Material-UI **/
import { makeStyles, useTheme } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider'; 
import Drawer from '@material-ui/core/Drawer';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';


/* Custom Hooks */
const useStyles = makeStyles(( theme )=>({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

/* Styled Components */
const Container = styled.div`
  background-color: ${({ theme })=> theme.palette.white };
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme })=> theme.spacing(2) }px;
`;

/** Main Component **/
const MainSideBar = ( props )=>{
  /** Props **/
  const {
    className,
    items,
    style,
    ...rest
  } = props;

  /** Hooks: Material-UI Styles **/
  const theme = useTheme();
  const classes = useStyles();

  /** Render **/
  return (
    <div style={ style }>
      <GridRow
        alignItems="center"
      >
        <GridColumn>
          ProFiles
        </GridColumn>
      </GridRow>
      <GridRow 
        alignItems="center"
      >
        <GridColumn xs={ 4 }>
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
