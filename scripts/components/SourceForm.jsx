var React = require('react');
var Widget = require('Widget');
var Form = require('Form');

var SourceForm = React.createClass({
  render: function() {
    var placeholderListURL = "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p";
    var placeholderFormURL = "http://www2.leboncoin.fr/ar/form/0";
    var cancelLink = (
      <a onClick={this.props.handleHideForm}><i className="fa fa-remove"></i></a>
    );
    var fields = [
      {label: 'List URL', id: 'list_url', placeholder: placeholderListURL, type: 'url', value: this.props.values.list_url},
      {label: 'Form URL', id: 'form_url', placeholder: placeholderFormURL, type: 'url', value: this.props.values.form_url},
      {label: 'Name', id: 'form_name', placeholder: 'John Doe', type: 'text', value: this.props.values.form_name},
      {label: 'Email', id: 'form_email', placeholder: 'john.doe@example.net', type: 'email', value: this.props.values.form_email},
      {label: 'Message', id: 'form_body', placeholder: 'Hi, ...', type: 'textarea', value: this.props.values.form_body},
      {type: 'submit', id: 'submit', name: 'Add'}
    ];

    return (
      <Widget title="Add source" links={cancelLink}>
        <Form handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} fields={fields} />
      </Widget>
    );
  }
});

module.exports = SourceForm;
