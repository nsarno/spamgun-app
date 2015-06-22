var React = require('react');
var Widget = require('Widget');

var getLocation = function(href) {
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

var SourceWidget = React.createClass({
  render: function() {
    var listURL = getLocation(this.props.source.data.list_url);
    var title = listURL.hostname;
    var tableData = this.props.source.data;
    var id = this.props.source.id;

    return (
      <Widget title={title}>
        <Table data={[
            ['List URL', tableData.list_url],
            ['Form URL', tableData.form_url],
            ['Form name', tableData.form_name],
            ['Form email', tableData.form_email],
            ['Form body', tableData.form_body],
          ]}
        />
      <button className="btn btn-default btn-primary" onClick={this.props.handleRunScrapper.bind(null, id)}>
        Run scrapper
      </button>
      <button className="btn btn-default btn-primary" onClick={this.props.handleRunSpammer.bind(null, id)}>
        <i className="fa fa-send"></i> Run spammer
      </button>

      <button className="btn btn-default btn-danger pull-right" onClick={this.props.handleRemoveSource.bind(null, id)}>
        <i className="fa fa-trash"></i> Destroy
      </button>
      </Widget>
    );
  }
});

module.exports = SourceWidget;
