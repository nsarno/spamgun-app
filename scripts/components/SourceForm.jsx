var React = require('react');
var Widget = require('Widget');
var Form = require('Form');

var SourceForm = React.createClass({
  render: function() {
    var placeholderListURL = "http://www.leboncoin.fr/voitures/offres/ile_de_france/?rs=2008&me=100000&f=p";
    var placeholderFormURL = "http://www2.leboncoin.fr/ar/form/0";
    var fields = [
      {id: 'list_url', placeholder: placeholderListURL, type: 'url'},
      {id: 'form_url', placeholder: placeholderFormURL, type: 'url'},
      {id: 'name', placeholder: 'John Doe', type: 'text'},
      {id: 'email', placeholder: 'john.doe@example.net', type: 'email'},
      {id: 'message', placeholder: 'Hi, ...', type: 'textarea'},
      {type: 'submit'}
    ];

    return (
      <Widget title="Add source">
        <Form handleSubmit={this.props.handleSubmit} fields={fields} />
      </Widget>
    );
  }
});

module.exports = SourceForm;