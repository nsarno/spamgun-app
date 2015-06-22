var React = require('react');

var Input = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input  
          className="form-control"
          type={this.props.type}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
});

var Textarea = React.createClass({
  render: function() {
    console.log('Textarea');
    var label = null;
    if (this.props.label != undefined) {
      label = <label htmlFor={this.props.id}>{this.props.label}</label>
    }

    return (
      <div className="form-group">
        {label}
        <textarea
          className="form-control"
          id={this.props.id}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
});

var Submit = React.createClass({
  render: function() {
    return (
      <button type="submit" className="btn btn-default submit">{this.props.children}</button>
    );
  }
});

var fieldToComponent = function (fieldType) {
  var component = Input;
  switch (fieldType) {
    case 'textarea':
      component = Textarea;
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
      <form className={this.props.styles} onSubmit={this.props.handleSubmit}>
        {formFields}
      </form>
    );
  }
});

module.exports = Form;
