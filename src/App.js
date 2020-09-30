/** React **/
import React, { useState, useCallback, useEffect } from 'react';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Redux: Reducers **/
import { actions, selectors } from '@reducers/authReducer';

/** Router **/
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

/** Styled **/
import styled, { css } from 'styled-components';

/** Material-UI **/
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

/** Layouts **/
import { MainHeader } from '@layouts/MainLayout/MainHeader';
import { MainBody } from '@layouts/MainLayout/MainBody';
import { MainSideBar } from '@layouts/MainLayout/MainSideBar';

/** Views **/
import { Home, Board, Chat } from '@views';
import { SignIn, SignUp, ReSign } from '@views/Sign';

/** Custom Components **/
import { PublicRoute, PrivateRoute } from '@components/Routes';

/** Others **/
import axios from 'axios';


/** Styled Components **/
const Container = styled.div`
  padding-top: 56px;
  height: 100%;
  padding-left: ${({ shift })=>( shift )}px;
  
  ${({ media })=>(
    css`
      ${ media } {
        padding-top: 64px;
      }
    `
  )}
`;

const Section = styled.section`
  position: relative;
  height: 100%;
`;

/** Main Component **/
const App = ( props )=>{
  /** hooks: Redux **/
  const dispatch = useDispatch();
  const signed = useSelector( selectors.getSigned );

  /** Hooks: Material-UI Styles **/
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  /** State **/
  const [ isOpenSideBar, setIsOpenSideBar ] = useState( isDesktop );

  /** Handlers: Close SideBar **/
  const handleCloseSideBar = useCallback(( event )=>{
    setIsOpenSideBar( false );
  }, [ isOpenSideBar ]);

  /** Side Effects: When windows resize to large width, then open sidebar. **/
  useEffect(()=>{
    setIsOpenSideBar( isDesktop );
  }, [ isDesktop ]);

  /** Side Effects: Check session and update user info. **/
  useEffect(()=>{
    // console.log( signed );
  }, [ signed ]);

  /** Render **/
  return (
    <BrowserRouter>
      <Container
        shift={ isDesktop && 240 }
        media={ theme.breakpoints.up('sm') }
      >
        <MainHeader />
        <Section>
          <MainSideBar
            open={ isOpenSideBar }
            onClose={ handleCloseSideBar }
          />
          <MainBody>
            <Switch>
              <PublicRoute
                exact
                path="/signin"
                component={ SignIn }
              />
              <PublicRoute
                exact
                path="/signup"
                component={ SignUp }
              />
              <PublicRoute
                exact
                path="/"
                component={ Home }
              />
              <PrivateRoute
                exact
                path="/board"
                component={ Board }
              />
              <PrivateRoute
                exact
                path="/chat"
                component={ Chat }
              />
              <Redirect from="*" to="/" />
            </Switch>
          </MainBody>
        </Section>
      </Container>
    </BrowserRouter>
  );
}

/** Prop Types **/
App.propTypes = { }

/** Default Props **/
App.defaultProps = { }

/** Exports **/
export default App;
