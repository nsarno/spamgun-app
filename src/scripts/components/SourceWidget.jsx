var React = require('react');
var classNames = require('classnames');
var Widget = require('Widget');
var Form = require('Form');

var DashboardActions = require('DashboardActions');
var SourceStore = require('SourceStore');

var SourceWidget = React.createClass({
  initialFormValues: function() {
    var source = this.props.source.data;
    return ({
      title: source.title,
      list_url: source.list_url,
      form_url: source.form_url,
      form_name: source.form_name,
      form_email: source.form_email,
      form_body: source.form_body,
      page_param: source.page_param,
      page_start: source.page_start,
      page_max: source.page_max,
      spam_max: source.spam_max
    });
  },

  getInitialState: function() {
    var source = this.props.source.data;

    return ({
      editing: false,
      showSettings: false,
      formValues: this.initialFormValues()
    });
  },

  componentDidMount: function() {
    SourceStore.addChangeListener(this.onSourceChange);
  },

  componentWillUnmount: function() {
    SourceStore.removeChangeListener(this.onSourceChange);
  },

  handleToggleSettings: function() {
    if (this.state.showSettings == true) {
      this.handleCancelUpdate();
    }
    this.setState({
      showSettings: !this.state.showSettings
    });
  },

  onSourceChange: function() {
    this.setState({
      editing: this.props.source.status == 'ok' ? false : this.state.editing
    });
  },

  handleRefresh: function() {
    DashboardActions.refreshSource(this.props.source.key, this.props.source.data.id);
  },

  handleChange: function(event) {
    var state = { formValues: this.state.formValues };
    state['formValues'][event.target.id] = event.target.value;
    state.editing = true;
    this.setState(state);
  },

  handleUpdate: function() {
    DashboardActions.updateSource(this.props.source.key, this.props.source.data.id, this.state.formValues);
  },

  handleCancelUpdate: function() {
    this.setState({
      editing: false,
      formValues: this.initialFormValues()
    });
  },

  handleRemoveSource: function() {
    DashboardActions.removeSource(this.props.source);
  },

  handleRunScrapper: function() {
    DashboardActions.scrapSource(this.props.source);
  },

  handleRunSpammer: function() {
    DashboardActions.spamSource(this.props.source);
  },

  render: function() {
    var key = this.props.source.key;
    var pendingCount = this.props.source.data.pending_count;
    var repliedCount = this.props.source.data.replied_count;

    // Edit source form fields
    var fields = [
      {label: 'Title', id: 'title', type: 'text', value: this.state.formValues.title},
      {label: 'List URL', id: 'list_url', type: 'url', disabled: true, value: this.state.formValues.list_url},
      {label: 'Form URL', id: 'form_url', type: 'url', value: this.state.formValues.form_url},
      {label: 'Name', id: 'form_name', type: 'text', value: this.state.formValues.form_name},
      {label: 'Email', id: 'form_email', type: 'email', value: this.state.formValues.form_email},
      {label: 'Message', id: 'form_body', type: 'textarea', value: this.state.formValues.form_body},
      {label: 'Page param', id: 'page_param', type: 'input', value: this.state.formValues.page_param},
      {label: 'Page start', id: 'page_start', type: 'input', value: this.state.formValues.page_start},
      {label: 'Page max', id: 'page_max', type: 'input', value: this.state.formValues.page_max},
      {label: 'Spam max', id: 'spam_max', type: 'input', value: this.state.formValues.spam_max}
    ];

    if (this.props.source.data.scrapping) {
      var scrapButton = (
        <button className="btn btn-default btn-primary disabled">
          <i className="fa fa-circle-o-notch fa-spin"></i> Scrapping...
        </button>
      );      
    } else if (this.props.source.data.scrap_pending) {
      var scrapButton = (
        <button className="btn btn-default btn-primary disabled">
          <i className="fa fa-binoculars"></i> Pending...
        </button>
      );
    } else {
      var scrapButton = (
        <button className="btn btn-default btn-primary" onClick={this.handleRunScrapper}>
          <i className="fa fa-binoculars"></i> Run Scrapper
        </button>
      );
    }

    if (this.props.source.data.spamming) {
      var spamButton = (
        <button className="btn btn-default btn-danger disabled">
          <i className="fa fa-circle-o-notch fa-spin"></i> Spamming...
        </button>
      );    
    } else if (this.props.source.data.spam_pending) {
      var spamButton = (
        <button className="btn btn-default btn-danger disabled">
          <i className="fa fa-send"></i> Pending...
        </button>
      );    
    } else {
      var spamButton = (
        <button className="btn btn-default btn-danger" onClick={this.handleRunSpammer}>
          <i className="fa fa-send"></i> Run Spammer <span className="badge">{pendingCount}</span>
        </button>
      );
    }

    if (this.state.showSettings) {
      var settingsButton = (
        <button className="btn btn-default" onClick={this.handleToggleSettings}>
          <i className="fa fa-cog fa-spin"></i>
        </button>
      );
    } else {
      var settingsButton = (
        <button className="btn btn-default" onClick={this.handleToggleSettings}>
          <i className="fa fa-cog"></i>
        </button>
      );
    }

    if (this.props.source.data.processing) {
      var refreshButton = (
        <button className="btn btn-default" onClick={this.handleRefresh}>
          <i className="fa fa-refresh fa-spin"></i>
        </button>
      );
    } else {
      var refreshButton = (
        <button className="btn btn-default" onClick={this.handleRefresh}>
          <i className="fa fa-refresh"></i>
        </button>
      );
    }

    var actions = (
      <div className="actions pull-right">
        {scrapButton}
        {spamButton}
        {settingsButton}
        {refreshButton}
      </div>
    );

    var body = (
      <div className="container-fluid">
        <div className="row">
          <a className="btn" href={this.props.source.data.list_url}>
            <i className="fa fa-terminal"></i> {this.props.source.data.title}
          </a>
          {actions}
        </div>
      </div>
    );

    if (this.state.showSettings == true) {
      if (this.state.editing == true) {
        var updateOrCancel = (
          <div>
            <button className="btn btn-default btn-primary" onClick={this.handleUpdate}>
              {this.props.source.status == 'updating' ? <i className="fa fa-spinner fa-pulse"></i> : 'Update'}
            </button>
            <button className="btn btn-default btn-default" onClick={this.handleCancelUpdate}>Cancel</button>
          </div>
        );
      }
      var settings = (
        <div className="settings">
          <Form
            handleSubmit={this.handleUpdate}
            handleChange={this.handleChange}
            fields={fields}
          />
          {updateOrCancel}
          <div className="danger-zone">
            <div className="panel panel-danger">
              <div className="panel-heading">
                Danger Zone
              </div>
              <div className="panel-body">
                <h4>Delete this source</h4>
                <p className="btn-align pull-left">
                  Once you delete a source, there is no going back. And all the ads history linked to it will be destroyed.
                </p>
                <button className="btn btn-default btn-danger pull-right" onClick={this.handleRemoveSource}>
                  <i className="fa fa-trash"></i> Destroy
                </button>
              </div>
            </div>
          </div>
        </div>
      );      
    }

    var footer = (
      <div>
        <div className="data-display">
          Pending ads <span className="badge">{pendingCount}</span>
        </div>
        <div className="data-display">
          Replies sent <span className="badge">{repliedCount}</span>
        </div>
      </div>
    );
    
    return (
      <Widget footer={footer}>
        {body}
        {settings}
      </Widget>
    );
  }
});

module.exports = SourceWidget;
