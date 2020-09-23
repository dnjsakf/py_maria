/** React **/
import React, { useState, useCallback, useEffect }  from 'react';
import PropTypes from 'prop-types';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Router **/
import { useHistory, Link as RouterLink } from 'react-router-dom';

/** Redux: Reducers **/
import { selectors, actions } from '@reducers/authReducer';

/** Styled **/
import styled from 'styled-components';

/** Material-UI **/
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';

/** Others **/
import axios from 'axios';
import clsx from 'clsx';


/** Custom Hooks **/
const useStyles = makeStyles((theme)=>({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

/** Styled Components **/
const Container = styled.header`
  width: 100%;
  height: 65px;
  background-color: lightgreen;
`;

/** Main Component **/
const MainHeader = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    location,
    match,
    ...rest
  } = props;

  /** State **/
  const [ notifications, setNotifications ] = useState([]);

  /** Hooks: Material-UI Styles **/
  const classes = useStyles();

  /** Hooks: Redux **/
  const dispatch = useDispatch();
  const signed = useSelector(selectors.getSigned);
  const user = useSelector(selectors.getUser);
  
  /** Hooks: Router **/
  const history = useHistory();

  /** Handlers: Redirect to Settings Page **/
  const handleRedirectSettings = useCallback(( event )=>{
    console.log({
      handleRedirectSettings: event
    });
  }, [ history ]);

  /** Handlers: Redirect to SignIn Page **/
  const handleRedirectSignIn = useCallback(( event )=>{
    console.log( history );
    history.push("/signin");
  }, [ history ]);

  /** Handlers: Sign Out **/
  const handleSignOut = useCallback(( event )=>{
    event.preventDefault();
    
    axios({
      method: "POST",
      url: "/security/signout",
    }).then(( resp )=>{
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    }).catch(( error )=>{
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    });
  }, []);

  /** Handlers: Open SideBarMenus. **/
  const handleOpenSideBar = useCallback(( event )=>{
    console.log({ handleOpenSideBar: event });
  }, []);

  /** Handlers: Open Noti. list popup. **/
  const handleOpenNoti = useCallback(( event )=>{
    console.log({ handleOpenNoti: event });
  }, []);

  /** Side Effects: Updated user. **/
  useEffect(()=>{
    console.log( user );
  }, [ user ]);
  
  /** Render **/
  return (
    <AppBar
      {...rest}
      className={ clsx( classes.root, className ) }
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/public/images/logos/logo02.png"
            height="50px"
          />
        </RouterLink>
        <div className={ classes.flexGrow } />
        <Hidden mdDown>
          {
            signed
            ? (
                <React.Fragment>
                  <IconButton 
                    color="inherit"
                    onClick={ handleOpenNoti }
                  >
                    <Badge
                      badgeContent={ notifications.length }
                      color="error"
                      variant="standard"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={ handleRedirectSettings }
                  >
                    <SettingsIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={ handleSignOut }
                  >
                    <InputIcon />
                  </IconButton>
                </React.Fragment>
              )
            : (
                <React.Fragment>
                  <IconButton
                    color="inherit"
                    onClick={ handleRedirectSignIn }
                  >
                    <AccountBoxIcon />
                  </IconButton>
                </React.Fragment>
              )
          }
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={ handleOpenSideBar }
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

/** Prop Types **/
MainHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
MainHeader.defaultProps = { }

/** Exports **/
export default MainHeader;
