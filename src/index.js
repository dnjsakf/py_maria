/* Webpack */
import { hot } from 'react-hot-loader/root';

/** React **/
import React from 'react';

/** React Dom **/
import { render as RouterDomRender } from "react-dom";

/** Redux **/
import { Provider as StoreProvider } from 'react-redux';

/** Redux: store **/
import store from '@reducers/store';

/** Notistack **/
import { SnackbarProvider } from 'notistack';

/** Main Component **/
import App from './App';


/** Functions: Renderer **/
function render(Component){
  const root = document.getElementById("root");
  
  Component = module.hot ? hot( Component ) : Component;
  
  RouterDomRender((
    <React.StrictMode>
      <StoreProvider store={ store }>
        <SnackbarProvider
          maxSnack={3} 
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
        >
          <Component />
        </SnackbarProvider>
      </StoreProvider>
    </React.StrictMode>
   ), document.getElementById("root"));
}

/** Render Application **/
render(App);
