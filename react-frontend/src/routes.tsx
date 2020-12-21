import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';


import Home from './pages/Home'
import postagens from './pages/PostagemLista'


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/postagens" exact component={postagens} />
    </Switch>
  );
}

export default Routes;