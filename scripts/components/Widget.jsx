var React = require('react');

var Widget = React.createClass({
  render: function() {
    var heading = (
      <div className="panel-heading">
        {this.props.title}
        <div className="pull-right">
          {this.props.links}
        </div>
      </div>
    );
    
    return (
      <div className="panel panel-default">
        {this.props.title != undefined ? heading : null}
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Widget;
