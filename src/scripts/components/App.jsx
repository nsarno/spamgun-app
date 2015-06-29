import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router';

import Navbar from 'Navbar';
import Dashboard from 'Dashboard';
import Login from 'Login';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
}

var routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={Dashboard}/>
    <Route name='login' path='login' handler={Login}/>
    <Route name='dashboard' path='dashboard' handler={Dashboard} />
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.body);
});
