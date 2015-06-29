var React = require('react');

var Widget = React.createClass({
  render: function() {
    var heading = (
      <div className="panel-heading">
        {this.props.heading}
      </div>
    );
    
    var footer = (
      <div className="panel-footer">
        {this.props.footer}
      </div>
    );
    return (
      <div className="panel panel-default">
        {this.props.heading != undefined ? heading : null}
        <div className="panel-body">
          {this.props.children}
        </div>
        {this.props.footer != undefined ? footer : null}
      </div>
    );
  }
});

module.exports = Widget;
