var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('expect');
var Dashboard = require('../Dashboard');

describe('Dashboard', function () {
  it('renders without problems', function () {
    var dashboard = TestUtils.renderIntoDocument(<Dashboard/>);
    expect(dashboard).toExist();
  });
});
