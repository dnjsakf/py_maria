/* React */
import React, { useState, useCallback, useEffect } from 'react';

/* Router */
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

/* Redux */
import { useSelector } from 'react-redux';

/* Redux: Reducer */
import { selectors } from '@reducers/authReducer';

/* Styled */
import styled, { css } from 'styled-components';

/* Material-UI */
import theme from '@theme';
import { useMediaQuery } from '@material-ui/core';

/* Layouts */
import { MainHeader } from '@layouts/MainLayout/MainHeader';
import { MainBody } from '@layouts/MainLayout/MainBody';
import { MainSideBar } from '@layouts/MainLayout/MainSideBar';

/* Views */
import { Home, Board, Chat } from '@views';
import { SignIn, SignUp, ReSign } from '@views/Sign';

/* Custom Components */
import { PublicRoute, PrivateRoute } from '@components/Routes';


/* Styled Components */
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

/* Main Component */
const App = ( props )=>{
  /* Hooks: Material-UI Styles */
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  /* State */
  const [ isOpenSideBar, setIsOpenSideBar ] = useState( isDesktop );

  /* Hooks: Redux Reducer for sign check. */
  const signed = useSelector( selectors.getSigned );

  /* Handlers: Close SideBar */
  const handleCloseSideBar = useCallback(( event )=>{
    setIsOpenSideBar( false );
  }, [ isOpenSideBar ]);

  /* Side Effects: When windows resize to large width, then open sidebar. */
  useEffect(()=>{
    setIsOpenSideBar( isDesktop );
  }, [ isDesktop ]);

  /* Side Effects: Signed user. */
  useEffect(()=>{
    // console.log("signed", signed);
  }, [ signed ]);

  /* Render */
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

/* Prop Types */
App.propTypes = { }

/* Default Props */
App.defaultProps = { }

/* Exports */
export default App;
