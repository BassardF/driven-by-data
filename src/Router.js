import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Sports from './components/pages/Sports';
import Exercices from './components/pages/Exercices';
import TopBar from './components/common/TopBar';
import Breadcrumbs from './components/common/Breadcrumbs';

const Router = () => (
  <BrowserRouter>
    <div>
      <TopBar />
      <Breadcrumbs />
      <Route exact path="/" component={Sports} />
      <Route path="/:sport/exercices" component={Exercices} />
    </div>
  </BrowserRouter>
);

export default Router;
