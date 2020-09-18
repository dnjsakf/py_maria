/* React */
import React from 'react';

/* Material-UI */
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

/* Main Component */
const CircularProgress = ( props ) => (
  <Box
    top={0}
    left={0}
    bottom={0}
    right={0}
    position="absolute"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <MuiCircularProgress />
  </Box>
);

/* Exports */
export default CircularProgress;