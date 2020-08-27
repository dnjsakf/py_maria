const { Route } = ReactRouterDOM;

const PublicRoute = ( props )=>{
  const {
    path,
    layout: Layout,
    component: Component,
    exact,
    ...rest
  } = props;
  
  return (
    <Route
      { ...rest }
      path={ path }
      render={
        ( matchProps )=>(
          <Layout>
            <Component {...matchProps}/>
          </Layout>
        )
      }
    />
  );
}