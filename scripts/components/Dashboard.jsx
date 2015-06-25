var React = require('react');

var SourceStore = require('SourceStore');
var DashboardActions = require('DashboardActions');

var DocumentTitle = require('react-document-title');
var SourceWidget = require('SourceWidget');
var SourceForm = require('SourceForm');
var Widget = require('Widget');

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      sources: SourceStore.getSources(),
      addingSource: false,
      formValues: {
        list_url: "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p",
        form_url: "http://www2.leboncoin.fr/ar/form/0",
        form_name: "",
        form_email: "",
        form_body: ""
      }
    }
  },

  componentDidMount: function() {
    SourceStore.addChangeListener(this.onSourceChange);

    DashboardActions.loadSources();
  },

  componentWillUnmount: function(){

    SourceStore.removeChangeListener(this.onSourceChange);
  },

  onSourceChange: function() {
    this.setState({
      sources: SourceStore.getSources()
    });
  },

  handleShowForm: function() {
    this.setState({ addingSource: true });
  },

  handleHideForm: function() {
    this.setState({ addingSource: false });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.handleHideForm();
    DashboardActions.addSource({ 
      source: this.state.formValues
    });
  },

  handleChange: function(event) {
    var state = { formValues: this.state.formValues };
    state['formValues'][event.target.id] = event.target.value;
    this.setState(state);
  },

  render: function() {
    var newSourceLink = <a onClick={this.handleShowForm}>new source</a>;
    var sourceForm = (
      <SourceForm
        handleSubmit={this.handleSubmit}
        handleHideForm={this.handleHideForm}
        handleChange={this.handleChange}
        values={this.state.formValues}
      />
    );
    var spinner = (
      <div className="spinner">
        <i className="fa fa-refresh fa-spin"></i>
        <span>Loading sources...</span>
      </div>
    );
    var sources = _.map(this.state.sources, function(source) {
      return (
        <SourceWidget key={source.key} source={source} />
      );
    }.bind(this));

    return (
      <div id="dashboard" className="container">
        {SourceStore.loading ? spinner : sources}
        {this.state.addingSource ? sourceForm : newSourceLink}
      </div>
    );
  }
});

module.exports = Dashboard;
