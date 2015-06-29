var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var spamgunService = require('SpamgunService');

var DashboardActions = {
  loadSources: function() {
    Dispatcher.dispatch({ type: Constants.LOAD_SOURCES });
    spamgunService.loadSources(
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

  refreshSource: function(key, id) {
    Dispatcher.dispatch({
      type: Constants.REFRESH_SOURCE,
      data: { key: key }
    });
    spamgunService.refreshSource(id,
      function(source) {
        if (source.processing) {
          setTimeout(function() {
            this.refreshSource(key, id);
          }.bind(this), 5 * 1000);
        };
        Dispatcher.dispatch({
          type: Constants.REFRESH_SOURCE_SUCCESS,
          data: { key: key, source: source }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.REFRESH_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      }
    );
  },

  addSource: function(data) {
    var key = _.uniqueId();

    Dispatcher.dispatch({
      type: Constants.ADD_SOURCE,
      data: { key: key, source: data.source }
    });
    spamgunService.addSource(data,
      function(source) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_SUCCESS,
          data: { key: key, source: source }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      }.bind(this)
    );
  },

  updateSource: function(key, id, data) {
    Dispatcher.dispatch({
      type: Constants.UPDATE_SOURCE,
      data: { key: key, source: data }
    });
    spamgunService.updateSource(id, data,
      function(source) {
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
    var key = source.key;

    Dispatcher.dispatch({
      type: Constants.REMOVE_SOURCE,
      data: source
    });
    spamgunService.removeSource(source,
      function() {
        Dispatcher.dispatch({
          type: Constants.REMOVE_SOURCE_SUCCESS,
          data: { key: key }
        });
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.ADD_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      }.bind(this)
    );
  },

  scrapSource: function(source) {
    var key = source.key;
    Dispatcher.dispatch({
      type: Constants.SCRAP_SOURCE,
      data: source
    });
    spamgunService.scrapSource(source,
      function(job) {
        Dispatcher.dispatch({
          type: Constants.SCRAP_SOURCE_SUCCESS,
          data: { key: key, job: job }
        });
        this.refreshSource(key, source.data.id);
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.SCRAP_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      });
  },

  spamSource: function(source) {
    var key = source.key;
    Dispatcher.dispatch({
      type: Constants.SPAM_SOURCE,
      data: source
    });
    spamgunService.spamSource(source,
      function(job) {
        Dispatcher.dispatch({
          type: Constants.SPAM_SOURCE_SUCCESS,
          data: { key: key, job: job }
        });
        this.refreshSource(key, source.data.id);
      }.bind(this),
      function(error) {
        Dispatcher.dispatch({
          type: Constants.SPAM_SOURCE_FAILURE,
          data: { key: key, error: error }
        });
      });
  }
};

module.exports = DashboardActions;
