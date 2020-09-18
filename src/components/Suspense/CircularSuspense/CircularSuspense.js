/* React */
import React, { Suspense } from 'react';

/* Custom Component */
import ErrorBoundary from 'components/ErrorBoundary';
import { CircularProgress } from 'components/Progress';

/* Main Component */
const CircularSuspense = props => (
  <ErrorBoundary>
    <Suspense fallback={ <CircularProgress /> }>
      { props.children }
    </Suspense>
  </ErrorBoundary>
)

/* Exports */
export default CircularSuspense;