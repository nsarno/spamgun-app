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
      list_url: source.list_url,
      form_url: source.form_url,
      form_name: source.form_name,
      form_email: source.form_email,
      form_body: source.form_body
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

  onSourceChange: function() {
    this.setState({editing: this.props.source.status == 'ok' ? false : this.state.editing});
  },

  handleChange: function(event) {
    var state = { formValues: this.state.formValues };
    state['formValues'][event.target.id] = event.target.value;
    state.editing = true;
    this.setState(state);
  },

  handleUpdate: function() {
    DashboardActions.updateSource(this.props.source.id, this.props.source.data.id, this.state.formValues);
  },

  handleCancelUpdate: function() {
    this.setState({
      editing: false,
      formValues: this.initialFormValues()
    });
  },

  handleToggleSettings: function() {
    if (this.state.showSettings == true) {
      this.handleCancelUpdate();
    }
    this.setState({
      showSettings: !this.state.showSettings
    });
  },

  render: function() {
    var key = this.props.source.id;

    // Edit source form fields
    var fields = [
      {label: 'Form URL', id: 'form_url', type: 'url', value: this.state.formValues.form_url},
      {label: 'Name', id: 'form_name', type: 'text', value: this.state.formValues.form_name},
      {label: 'Email', id: 'form_email', type: 'email', value: this.state.formValues.form_email},
      {label: 'Message', id: 'form_body', type: 'textarea', value: this.state.formValues.form_body},
    ];
    var settingsBtnClasses = classNames('btn', 'btn-default', {
      active: this.state.showSettings
    });
    var actions = (
      <div className="actions pull-right">
        <button className="btn btn-default btn-primary" onClick={this.props.handleRunScrapper.bind(null, key)}>
          <i className="fa fa-binoculars"></i> Run scrapper
        </button>
        <button className="btn btn-default btn-danger" onClick={this.props.handleRunSpammer.bind(null, key)}>
          <i className="fa fa-send"></i> Run spammer
        </button>
        <button className={settingsBtnClasses} onClick={this.handleToggleSettings}>
          <i className="fa fa-cog"></i>
        </button>
      </div>
    );

    var body = (
      <div className="container-fluid">
        <div className="row">
          <a className="btn" href={this.props.source.data.list_url}>
            <i className="fa fa-terminal"></i> {this.props.source.data.list_url}
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
                <button className="btn btn-default btn-danger pull-right" onClick={this.props.handleRemoveSource.bind(null, key)}>
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
        <div className="data-display">Pending ads <span className="badge">42</span></div>
        <div className="data-display">Replied ads <span className="badge">42</span></div>
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
