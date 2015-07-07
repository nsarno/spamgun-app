var React = require('react');
var Widget = require('Widget');
var Form = require('Form');

var SourceForm = React.createClass({
  render: function() {
    var placeholderListURL = "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p";
    var placeholderFormURL = "http://www2.leboncoin.fr/ar/form/0";
    var heading = (
      <div>
        Add source
        <div className="pull-right">
          <a onClick={this.props.handleHideForm}><i className="fa fa-remove"></i></a>
        </div>
      </div>
    );
    var fields = [
      {label: 'Title', id: 'title', placeholder: 'Title', type: 'text', value: this.props.values.title},
      {label: 'List URL', id: 'list_url', placeholder: placeholderListURL, type: 'url', value: this.props.values.list_url},
      {label: 'Form URL', id: 'form_url', placeholder: placeholderFormURL, type: 'url', value: this.props.values.form_url},
      {label: 'Name', id: 'form_name', placeholder: 'John Doe', type: 'text', value: this.props.values.form_name},
      {label: 'Email', id: 'form_email', placeholder: 'john.doe@example.net', type: 'email', value: this.props.values.form_email},
      {label: 'Message', id: 'form_body', placeholder: 'Hi, ...', type: 'textarea', value: this.props.values.form_body},
      {label: 'Page param', id: 'page_param', type: 'input', value: this.props.values.page_param},
      {label: 'Page start', id: 'page_start', type: 'input', value: this.props.values.page_start},
      {label: 'Page max', id: 'page_max', type: 'input', value: this.props.values.page_max},
      {label: 'Spam max', id: 'spam_max', type: 'input', value: this.props.values.spam_max}
    ];

    return (
      <Widget heading={heading}>
        <Form handleChange={this.props.handleChange} fields={fields} />
        <button className="btn btn-primary" onClick={this.props.handleSubmit}>Add source</button>
      </Widget>
    );
  }
});

module.exports = SourceForm;
