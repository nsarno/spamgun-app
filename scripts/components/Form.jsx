var React = require('react');

var Form = React.createClass({
  render: function() {
    var formFields = _.map(this.props.fields, function(field, index) {
      var component = fieldToComponent(field.type);
      var componentProps = _.merge(field, { 
        handleChange: this.props.handleChange,
        key: index
      });
      return component(componentProps);
    }.bind(this));

    return (
      <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
        {formFields}
      </form>
    );
  }
});

var Field = React.createClass({
  render: function() {
    var label = (
      <label htmlFor={this.props.id} className="col-sm-2 control-label">
        {this.props.label}
      </label>
    );

    return (
      <div className="form-group">
        {this.props.label != undefined ? label : null}
        <div className="col-sm-8">
          {this.props.children}
        </div>
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
};

Form.fieldToComponent = fieldToComponent;

module.exports = Form;
