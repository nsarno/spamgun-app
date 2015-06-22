var React = require('react');

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

var Input = React.createClass({
  render: function() {
    return (
      <Field label={this.props.label}>
        <input
          className="form-control"
          id={this.props.id}
          type={this.props.type}
          placeholder={this.props.placeholder} />
      </Field>
    );
  }
});

var Textarea = React.createClass({
  render: function() {
    return (
      <Field label={this.props.label}>
        <textarea
          className="form-control"
          id={this.props.id}
          placeholder={this.props.placeholder} />
      </Field>
    );
  }
});

var Submit = React.createClass({
  render: function() {
    return (
      <Field label="">
        <button type="submit" className="btn btn-default submit">{this.props.name}</button>
      </Field>
    );
  }
});

var fieldToComponent = function (fieldType) {
  var component = Input;
  switch (fieldType) {
    case 'textarea':
      component = Textarea;
      break;
    case 'submit':
      component = Submit;
      break;
    default:
      component = Input;
  }
  return (React.createFactory(component));
};

var Form = React.createClass({
  render: function() {
    var formFields = _.map(this.props.fields, function(field, index) {
      var component = fieldToComponent(field.type);
      return component(_.merge(field, { key: index }));
    });

    return (
      <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
        {formFields}
      </form>
    );
  }
});

module.exports = Form;
