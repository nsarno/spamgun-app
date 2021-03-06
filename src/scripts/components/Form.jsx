var React = require('react');

var Form = React.createClass({
  render: function() {
    var formFields = _.map(this.props.fields, function(field, index) {
      var component = fieldToComponent(field.type);
      var componentProps = _.merge(field, { 
        handleChange: this.props.handleChange,
        key: index,
      });
      return component(componentProps);
    }.bind(this));

    return (
      <form onSubmit={this.props.handleSubmit}>
        {formFields}
      </form>
    );
  }
});

var Field = React.createClass({
  render: function() {
    var label = function() {
      if (this.props.label) {
        return (<label htmlFor={this.props.id}>{this.props.label}</label>);
      }
    }.bind(this);

    return (
      <div className="form-group">
        {label()}
        {this.props.children}
      </div>
    );
  }
});

Form.Input = React.createClass({
  render: function() {
    return (
      <Field label={this.props.label}>
        <input
          className="form-control"
          id={this.props.id}
          type={this.props.type}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
      </Field>
    );
  }
});

Form.Textarea = React.createClass({
  render: function() {
    return (
      <Field label={this.props.label}>
        <textarea
          className="form-control"
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
      </Field>
    );
  }
});

Form.Submit = React.createClass({
  render: function() {
    return (
      <Field label="">
        <button type="submit" className="btn btn-default submit">{this.props.name}</button>
      </Field>
    );
  }
});

function fieldToComponent(fieldType) {
  var component = Form.Input;
  switch (fieldType) {
    case 'textarea':
      component = Form.Textarea;
      break;
    case 'submit':
      component = Form.Submit;
      break;
    default:
      component = Form.Input;
  }
  return (React.createFactory(component));
}

Form.fieldToComponent = fieldToComponent;

module.exports = Form;
