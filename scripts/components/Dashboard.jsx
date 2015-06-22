'use strict';

var React = require('react');

var SourceStore = require('SourceStore');
var DashboardActions = require('DashboardActions');

var DocumentTitle = require('react-document-title');
var SourceWidget = require('SourceWidget');
var SourceForm = require('SourceForm');

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      sources: SourceStore.getSources(),
      list_url: "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p",
      form_url: "http://www2.leboncoin.fr/ar/form/0",
      form_name: "James Kilroy",
      form_email: "1i36xe+8pgk9bpdtb7rs@sharklasers.com",
      form_body: "Ce message a été envoyé automatiquement, vous pouvez l'ignorer.",
    }
  },

  componentDidMount: function() {
    SourceStore.addChangeListener(this.onSourceChange);

    DashboardActions.loadSources();
  },

  componentWillUnmount: function(){

    SourceStore.removeChangeListener(this.onSourceChange);
  },

  onSourceChange: function(){
    this.setState({
      sources: SourceStore.getSources()
    })
  },

  handleSubmit: function(event) {
    event.preventDefault();
    DashboardActions.addSource({ 
      source: {
        list_url: this.state.list_url,
        form_url: this.state.form_url,
        form_name: this.state.form_name,
        form_email: this.state.form_email,
        form_body: this.state.form_body
      }
    });
  },

  handleRemoveSource: function(id) {
    DashboardActions.removeSource(this.state.sources[id]);
  },

  handleChange: function(event) {
    var state = {}
    state[event.target.id] = event.target.value;
    this.setState(state);
  },

  render: function() {
    var spinner = <i className="fa fa-spinner"></i>;
    var sources = _.map(this.state.sources, function(source) {
      return (
        <SourceWidget key={source.id} source={source} handleRemoveSource={this.handleRemoveSource} />
      );
    }.bind(this));

    return (
      <div id="dashboard" className="container">
        <DocumentTitle title="Dashboard" />
        <h1>Dashboard</h1>
        {SourceStore.loading ? spinner : sources}
        <SourceForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
});

module.exports = Dashboard;
