'use strict';

var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var ParrotClient = require('ParrotClient');

var DashboardActions = {
  loadSources: function() {
    Dispatcher.dispatch({ type: Constants.LOAD_SOURCES });
    ParrotClient.loadSources(
      function(sources) {
        Dispatcher.dispatch({
          type: Constants.LOAD_SOURCES_SUCCESS,
          data: { sources: sources }
        });
      },
      function(error) {
        Dispatcher.dispatch({
          type: Constants.LOAD_SOURCES_FAILURE,
          data: { error: error }
        });
      }
    );
  },

  addSource: function(source) {
    var id = _.uniqueId();

    Dispatcher.dispatch({
      type: Constants.ADD_SOURCE,
      data: { id: id, source: source }
    });
    ParrotClient.addSource(source,
      function(source) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_SUCCESS,
          data: { id: id, source: source }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { id: id, error: error }
        });
      }.bind(this)
    );
  },

  removeSource: function(source) {
    var id = source.id;

    Dispatcher.dispatch({
      type: Constants.REMOVE_SOURCE,
      data: source
    });
    ParrotClient.removeSource(source,
      function() {
        Dispatcher.dispatch({
          type: Constants.REMOVE_SOURCE_SUCCESS,
          data: { id: id }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { id: id, error: error }
        });
      }.bind(this)
    );
  }
};

module.exports = DashboardActions;
