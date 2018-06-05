import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Sports from './components/pages/Sports';
import Exercices from './components/pages/Exercices';
import Records from './components/pages/Records';
import TopBar from './components/common/TopBar';
import Breadcrumbs from './components/common/Breadcrumbs';

const Router = () => (
  <BrowserRouter>
    <div>
      <TopBar />
      <Breadcrumbs />
      <div style={{ padding: '20px' }}>
        <Route exact path="/" component={Sports} />
        <Route exact path="/sports/:sport/exercices" component={Exercices} />
        <Route path="/sports/:sport/exercices/:exercice" component={Records} />
      </div>
    </div>
  </BrowserRouter>
);

export default Router;
