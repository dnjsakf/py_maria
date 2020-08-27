const MainBody = ( props )=>{
  const {
    className,
    children,
    ...rest
  } = props;

  return (
    <section className={ className }>
      <GridRow center>
        <GridColumn w4 center>
          { children }
        </GridColumn>
      </GridRow>
    </section>
  );
}