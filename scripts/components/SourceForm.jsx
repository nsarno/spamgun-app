var React = require('react');
var Widget = require('Widget');
var Form = require('Form');

var SourceForm = React.createClass({
  render: function() {
    var placeholderListURL = "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p";
    var placeholderFormURL = "http://www2.leboncoin.fr/ar/form/0";
    var cancelLink = (
      <a onClick={this.props.handleCancelSource}><i className="fa fa-remove"></i></a>
    );
    console.log(this.props.handleCancelSource);
    var fields = [
      {label: 'List URL', id: 'list_url', placeholder: placeholderListURL, type: 'url'},
      {label: 'Form URL', id: 'form_url', placeholder: placeholderFormURL, type: 'url'},
      {label: 'Name', id: 'name', placeholder: 'John Doe', type: 'text'},
      {label: 'Email', id: 'email', placeholder: 'john.doe@example.net', type: 'email'},
      {label: 'Message', id: 'message', placeholder: 'Hi, ...', type: 'textarea'},
      {type: 'submit', id: 'submit', name: 'Add'}
    ];

    return (
      <Widget title="Add source" links={cancelLink}>
        <Form handleSubmit={this.props.handleSubmit} fields={fields} />
      </Widget>
    );
  }
});

module.exports = SourceForm;
