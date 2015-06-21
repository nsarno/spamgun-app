var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var ParrotClient = require('ParrotClient');

var DashboardActions = {
  loadSources: function() {
    Dispatcher.dispatch({ type: Constants.LOAD_SOURCES })
    ParrotClient.loadSources(
      function(sources) {
        Dispatcher.dispatch({
          type: Constants.LOAD_SOURCES_SUCCESS,
          data: { sources: sources }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.LOAD_SOURCES_FAILURE,
          data: { error: error }
        });
      }.bind(this)
    );
  }
};

module.exports = DashboardActions;
