/** React **/
import React, { useCallback }  from 'react';
import PropTypes from 'prop-types';

/** Router **/
import { useHistory } from 'react-router-dom';

/** Redux **/
import { useDispatch, useSelector } from 'react-redux';

/** Redux: Reducers **/
import { selectors, actions } from '@reducers/authReducer';


/** Main Component **/
const MainHeader = ( props )=>{
  /** Props **/
  const {
    className,
    children,
    ...rest
  } = props;

  /** Hooks: Router **/
  const history = useHistory();

  /** Hooks: Redux **/
  const dispatch = useDispatch();
  const signed = useSelector(selectors.getSigned);
  const user = useSelector(selectors.getUser);
  
  /** Handlers: Redirect to Sign In Page **/
  const handleRedirectSignIn = useCallback(( event )=>{
    history.push("/signin");
  }, []);

  /** Handlers: Sign Out **/
  const handleSignOut = useCallback(( event )=>{
    event.preventDefault();
    
    axios({
      method: "POST",
      url: "/security/signout",
    }).then(( resp )=>{
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    }).catch(( error )=>{
      localStorage.removeItem("access_token");
      dispatch(
        actions.signFailure()
      );
    });
  }, []);
  
  /** Render **/
  return (
    <header
      { ...rest }
      className={ className }
    >
      <GridRow right style={{ height: "100%" }}>
      {
        signed
        ? (
            <React.Fragment>
              <GridColumn w1 center>
                <span><strong>{ user.user_nick }</strong></span>
              </GridColumn>
              <GridColumn w1 center>
                <BaseButton onClick={ handleSignOut }>SignOut</BaseButton>
              </GridColumn>
            </React.Fragment>
          )
        : (
            <GridColumn w1 center>
              <BaseButton onClick={ handleRedirectSignIn }>SignIn</BaseButton>
            </GridColumn>
          )
      }
      {
        children && (
          <GridColumn center w2>
            { children }
          </GridColumn>
        )
      }
      </GridRow>
    </header>
  );
}

/** Prop Types **/
MainHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
MainHeader.defaultProps = { }

/** Exports **/
export default MainHeader;
