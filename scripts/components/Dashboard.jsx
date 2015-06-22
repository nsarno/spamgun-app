'use strict';

var React = require('react');

var SourceStore = require('SourceStore');
var DashboardActions = require('DashboardActions');

var DocumentTitle = require('react-document-title');
var SourceWidget = require('SourceWidget');

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
    var sources = _.map(this.state.sources, function(source) {
      return (
        <SourceWidget key={source.id} source={source} handleRemoveSource={this.handleRemoveSource} />
      );
    }.bind(this));

    return (
      <div id="dashboard" className="container">
        <DocumentTitle title="Dashboard" />
        <h1>Dashboard</h1>
        {sources}
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" id="list_url" placeholder="List URL" />
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" id="form_url" placeholder="Form URL" />
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" id="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" id="email" placeholder="email" />
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" id="body" placeholder="message" />
          </div>
          <div className="form-group">
            <input onChange={this.handleChange} type="submit" className="form-control"/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Dashboard;
