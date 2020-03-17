import React, { lazy, Suspense } from 'react';

const LazylistView = lazy(() => import('./listView'));

const listView = props => (
  <Suspense fallback={null}>
    <LazylistView {...props} />
  </Suspense>
);

export default listView;
