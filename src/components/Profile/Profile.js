/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link } from 'react-router-dom';

/* Material-UI */
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* Others */
import clsx from 'clsx';


/* Custom Hooks */
const useStyles = makeStyles( theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

/* Main Component */
const Profile = ( props )=>{
  /* Props */
  const {
    className,
    info,
    ...rest
  } = props;
  
  /* Hooks: Material-UI Styles */
  const classes = useStyles();

  /* Render */
  return (
    <div
      className={ clsx(classes.root, className) }
    >
      <Avatar
        alt="Person"
        className={ classes.avatar }
        // component={ Link }
        src={ info.avatar }
        to="/settings"
      />
      <Typography
        className={ classes.name }
        variant="h4"
      >
        { info.name }
      </Typography>
      <Typography variant="body2">
        { info.bio }
      </Typography>
    </div>
  );
};

/* Prop Types */
Profile.propTypes = {
  className: PropTypes.string
};

/* Default Props */
Profile.defaultProps = {
  info: {
    name: 'Dochi',
    avatar: '/public/images/avatars/avatar01.png',
    bio: 'Developer'
  }
}

/* Exrpots */
export default Profile;