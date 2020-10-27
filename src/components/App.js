import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';
import Posts from './Posts';
import Tasks from './Tasks';
import Save from './Tasks/Save';

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/tasks/save" component={Save} />
      <Route exact path="/tasks/save/:userId/:taskId" component={Save} />
      <Route exact path="/posts/:key" component={Posts} />
    </div>
  </BrowserRouter>
);

export default App;