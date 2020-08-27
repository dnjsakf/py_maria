const MainBody = ( props )=>{
  const {
    className,
    children,
    style,
    ...rest
  } = props;

  return (
    <div
      className={ className }
      style={ style }
    >
      { children }
    </div>
  );
}