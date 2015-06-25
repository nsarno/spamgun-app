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

  addSource: function(data) {
    var key = _.uniqueId();

    Dispatcher.dispatch({
      type: Constants.ADD_SOURCE,
      data: { id: key, source: data.source }
    });
    ParrotClient.addSource(data,
      function(source) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_SUCCESS,
          data: { id: key, source: source }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { id: key, error: error }
        });
      }.bind(this)
    );
  },

  updateSource: function(key, id, data) {
    Dispatcher.dispatch({
      type: Constants.UPDATE_SOURCE,
      data: { key: key }
    });
    ParrotClient.updateSource(id, data,
      function() {
        Dispatcher.dispatch({
          type: Constants.UPDATE_SOURCE_SUCCESS,
          data: { key: key }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.UPDATE_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      }.bind(this)
    );
  },

  removeSource: function(source) {
    var key = source.id;

    Dispatcher.dispatch({
      type: Constants.REMOVE_SOURCE,
      data: source
    });
    ParrotClient.removeSource(source,
      function() {
        Dispatcher.dispatch({
          type: Constants.REMOVE_SOURCE_SUCCESS,
          data: { id: key }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { id: key, error: error }
        });
      }.bind(this)
    );
  },

  scrapSource: function(source) {
    var key = source.id;
    Dispatcher.dispatch({
      type: Constants.SCRAP_SOURCE,
      data: source
    });
    ParrotClient.scrapSource(source,
      function(job) {
        Dispatcher.dispatch({
          type: Constants.SCRAP_SOURCE_SUCCESS,
          data: { id: key, job: job }
        });
      },
      function(error) {
        Dispatcher.dispatch({
          type: Constants.SCRAP_SOURCE_FAILURE,
          data: { id: key, error: error }
        });
      });
  },

  spamSource: function(source) {
    var key = source.id;
    Dispatcher.dispatch({
      type: Constants.SPAM_SOURCE,
      data: source
    });
    ParrotClient.spamSource(source,
      function(job) {
        Dispatcher.dispatch({
          type: Constants.SPAM_SOURCE_SUCCESS,
          data: { id: key, job: job }
        });
      },
      function(error) {
        console.log('spam error');
        Dispatcher.dispatch({
          type: Constants.SPAM_SOURCE_FAILURE,
          data: { id: key, error: error }
        });
      });
  }
};

module.exports = DashboardActions;
