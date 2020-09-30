/** React **/
import React, { useState, useCallback, useEffect }  from 'react';
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
import { Profile } from '@components/Profile';


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
    open,
    onClose,
    variant,
    ...rest
  } = props;

  /** Hooks: Material-UI Styles **/
  const theme = useTheme();
  const classes = useStyles();

  /** Render **/
  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawer
      }}
      onClose={ onClose }
      open={ open }
      variant={ variant }
    >
      <Container theme={ theme }>
        <Profile />
        <Divider className={ classes.divider } />
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
      </Container>
    </Drawer>
  );
}

/** Prop Types **/
MainSideBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  variant: PropTypes.oneOf([
    'persistent',
    'temporary'   // blind
  ]),
}

/** Default Props **/
MainSideBar.defaultProps = {
  variant: "persistent",
  items: [
    {
      id: "Board",
      label: "Board",
      link: "/board",
      auth: [
        0   // public
      ]
    },
    {
      id: "Chat",
      label: "Chat",
      link: "/chat",
      auth: [
        1000   // private
      ]
    }
  ]
}

/** Exports **/
export default MainSideBar;
