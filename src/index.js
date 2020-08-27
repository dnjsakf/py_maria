const { Provider: StoreProvider } = ReactRedux;

ReactDOM.render((
  <React.StrictMode>
    <StoreProvider store={ store }>
      <App />
    </StoreProvider>
  </React.StrictMode>
), document.getElementById("root"));