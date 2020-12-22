import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';


import Home from './pages/Home'
import postagens from './pages/PostagemLista'
import postagemCriar from './pages/PostagemCriar'
import postagemEditar from './pages/PostagemEditar'
import postagemVisualizar from './pages/PostagemVisualizar'


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/postagens" exact component={postagens} />
      <Route path="/criar" exact component={postagemCriar} />
      <Route path="/editar/:id" exact component={postagemEditar} />
      <Route path="/visualizar/:id" exact component={postagemVisualizar} />
    </Switch>
  );
}

export default Routes;