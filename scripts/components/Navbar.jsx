var React = require('react');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Parrot Dashboard</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
