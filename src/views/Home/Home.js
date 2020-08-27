const { Link } = ReactRouterDOM;

const MainHome = ( props )=>{
  return (
    <React.Fragment>
      <h3>Home</h3>
      <ul>
        <li><Link to="/board">Board</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
    </React.Fragment>
  );  
}