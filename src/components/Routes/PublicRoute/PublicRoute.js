const { Route } = ReactRouterDOM;

const PublicRoute = ( props )=>{
  const {
    path,
    layout: Layout,
    component: Component,
    exact,
    isDesktop,
    ...rest
  } = props;
  
  return (
    <Route
      { ...rest }
      path={ path }
      render={
        ( matchProps )=>(
          <Layout isDesktop={ isDesktop }>
            <Component {...matchProps}/>
          </Layout>
        )
      }
    />
  );
}