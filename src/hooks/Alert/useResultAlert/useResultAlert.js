/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Notistack */
import { useSnackbar } from 'notistack';


/* Main Component */
const useResultAlert = props => {
  /* Hooks: Notistack */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /* Handlers: Close snackbar. */
  const handleClose = () => {
      closeSnackbar();
  }

  /* Handlers: Open snackbar. */
  const handleOpen = (type, message) => {
      enqueueSnackbar(message, { 
      variant: type,
      autoHideDuration: 1500,
      transitionDuration: 150,
      action: ( <CloseButton onClose={ handleClose }/> ),
      })
  }

  /* Retruns */
  return handleOpen;
}

/* Exports */
export default useResultAlert;