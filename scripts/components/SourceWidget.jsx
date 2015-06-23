var React = require('react');
var Widget = require('Widget');
var Form = require('Form');

function getLocation(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

var Table = React.createClass({
  render: function() {
    var rows = _.map(this.props.data, function(row, index) {
      return (
        <tr key={index}>
          <th>{row[0]}</th>
          <td>{row[1]}</td>
        </tr>
      );
    });

    return (
      <table className="table borderless">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

Table.Input = React.createClass({
  render: function() {
    return (
      <input
        onChange={this.props.handleChange}
        className="form-control"
        type={this.props.type}
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
});

Table.Textarea = React.createClass({
  render: function() {
    return (
      <textarea
        onChange={this.props.handleChange}
        className="form-control"
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
});

var SourceWidget = React.createClass({
  getInitialState: function() {
    var source = this.props.source.data;

    return ({
      editing: false,
      formValues: {
        list_url: source.list_url,
        form_url: source.form_url,
        form_name: source.form_name,
        form_email: source.form_email,
        form_body: source.form_body
      }
    });
  },

  handleChange: function(event) {
    var state = { formValues: this.state.formValues };
    state['formValues'][event.target.id] = event.target.value;
    state.editing = true;
    this.setState(state);
  },

  handleSubmit: function() {

  },

  render: function() {
    var id = this.props.source.id;

    // var listURL = getLocation(this.props.source.data.list_url);
    // var title = listURL.hostname;

    var footer = (
      <div>
        <button className="btn btn-default btn-primary" onClick={this.props.handleRunScrapper.bind(null, id)}>
          Run scrapper
        </button>
        <button className="btn btn-default btn-primary" onClick={this.props.handleRunSpammer.bind(null, id)}>
          <i className="fa fa-send"></i> Run spammer
        </button>

        <button className="btn btn-default btn-danger pull-right" onClick={this.props.handleRemoveSource.bind(null, id)}>
          <i className="fa fa-trash"></i> Destroy
        </button>
      </div>
    );

    var fields = [
      {label: 'List URL', id: 'list_url', type: 'url', value: this.state.formValues.list_url},
      {label: 'Form URL', id: 'form_url', type: 'url', value: this.state.formValues.form_url},
      {label: 'Name', id: 'form_name', type: 'text', value: this.state.formValues.form_name},
      {label: 'Email', id: 'form_email', type: 'email', value: this.state.formValues.form_email},
      {label: 'Message', id: 'form_body', type: 'textarea', value: this.state.formValues.form_body},
    ];

    if (this.state.editing == true) {
      fields.push({type: 'submit', name: 'Update'});
    }
    

    return (
      <Widget footer={footer}>
        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} fields={fields} />
      </Widget>
    );
  }
});

module.exports = SourceWidget;
