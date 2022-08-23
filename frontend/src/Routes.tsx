import * as React from 'react';
import { Route, Routes as DomRoutes } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const DynamicRoute = React.lazy(() => import(/* webpackChunkName: "DynamicRoute" */ './Routes/DynamicRoute/DynamicRoute'));
const TestK8s = React.lazy(() => import(/* webpackChunkName: "TestK8s" */ './Routes/testK8s/TestK8s'));
const HorizontalNavTest = React.lazy(() => import(/* webpackChunkName: "HorizontalNavTest" */ './Routes/testNav/HorizontalNavTest'));

export const Routes: React.FC = () => (
  <React.Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <DomRoutes>
      <Route path="/*" element={<DynamicRoute />} />
      <Route path="/testK8s" element={<TestK8s />} />
      <Route path="/testNav" element={<HorizontalNavTest />} />
      <Route path="/testNav/:activeNavTab" element={<HorizontalNavTest />} />
    </DomRoutes>
  </React.Suspense>
);
