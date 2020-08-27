const { NavLink } = ReactRouterDOM;

const MainSideBar = ( props )=>{
  const {
    className,
    items,
    style,
    ...rest
  } = props;

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

MainSideBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

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