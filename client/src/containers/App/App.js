import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Store from '../../context/Store';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Gateways = lazy(() => import('../components/Gateways'));

const App = () => (
  <Router>
    <Store>
      <Layout>
        <Suspense
          fallback={
            <Backdrop open={true} invisible={true}>
              <CircularProgress size={30} />
            </Backdrop>
          }
        >
          <Switch>
            <Route exact path="/" component={Gateways} />
            <Route path="*" component={Gateways} />
          </Switch>
        </Suspense>
      </Layout>
    </Store>
  </Router>
);

export default App;
