var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Navbar = require('Navbar');
var Dashboard = require('Dashboard');
var Login = require('Login');

var App = React.createClass({
  render: function() {
    return (
      <div id="app">
        <Navbar />
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={Dashboard}/>
    <Route name='login' path='login' handler={Login}/>
    <Route name='dashboard' path='dashboard' handler={Dashboard} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

module.exports = App;
