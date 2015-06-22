var React = require('react');

var Widget = React.createClass({
  render: function() {
    var heading = null;
    if (this.props.title != undefined) {
      heading = (
        <div className="panel-heading">
          {this.props.title}
          {this.props.removeLink}
        </div>
      );
    }

    return (
      <div className="panel panel-default">
        {heading}
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Widget;
