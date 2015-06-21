var React = require('react');
var DocumentTitle = require('react-document-title');
var SourceStore = require('SourceStore');
var DashboardActions = require('DashboardActions');

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      sources: SourceStore.getSources()
    }
  },

  componentDidMount: function() {
    SourceStore.addChangeListener(this._onChange);

    DashboardActions.loadSources();
  },

  componentWillUnmount: function(){

    SourceStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      sources: SourceStore.getSources()
    })
  },

  render: function() {
    var sources = _.map(this.state.sources, function(source) {
      return (
        <li className="list-group-item">
          {source}
        </li>
      );
    });

    return (
      <div id="dashboard" className="container">
        <DocumentTitle title="Dashboard" />
        <h1>Dashboard</h1>
        <div className="panel panel-default">
          <div className="panel-heading">Sources</div>
          <div className="panel-body">
            <ul className="list-group">
              {sources}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
