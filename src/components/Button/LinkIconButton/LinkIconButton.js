/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Router */
import { Link } from 'react-router-dom';

/* Styled */
import styled from 'styled-components';

/* Material-UI */
import IconButton from '@material-ui/core/IconButton';


/* Styled Components */
const LinkIcon = styled(Link)`
  color: inherit;
`;

/* Custom Components */
const BaseIconButton = ({ icon: Icon, ...props })=>(
  <IconButton { ...props }>
    <Icon />
  </IconButton>
);

/* Main Component */
const LinkIconButton = ( props )=>{
  /* Props */
  const {
    to,
    ...rest
  } = props;

  /* Render */
  if( to ){
    return (
      <LinkIcon to={ to }>
        <BaseIconButton { ...rest } />
      </LinkIcon>
    );
  } else {
    return (
      <BaseIconButton { ...rest } />
    );
  }
};

/* Prop Types */
LinkIconButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

/* Default Props */
LinkIconButton.defaultProps = { }

/* Exports */
export default LinkIconButton;
