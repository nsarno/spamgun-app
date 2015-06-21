var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var EventEmitter = require('events').EventEmitter;

var SourceStore = _.assign({}, EventEmitter.prototype, {
  loading: false,
  error: null,
  sources: [],

  addChangeListener: function(callback) {
    this.on(Constants.CHANGE, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE, callback);
  },

  getSources: function() {
    return this.sources;
  },

  onLoadSources: function() {
    this.loading = true;
    this.emit(Constants.CHANGE);
  },

  onLoadSourcesSuccess: function(payload) {
    this.loading = false;
    this.error = null;
    this.sources = payload.sources;
    this.emit(Constants.CHANGE);
  },

  onLoadSourcesError: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit(Constants.CHANGE);
  }

});

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case Constants.LOAD_SOURCES:
      SourceStore.onLoadSources(payload.data);
      break;

    case Constants.LOAD_SOURCES_SUCCESS:
      SourceStore.onLoadSourcesSuccess(payload.data);
      break;

    case Constants.LOAD_SOURCES_ERROR:
      SourceStore.onLoadSourcesError(payload.data);
      break;

    default:
      return true;
  }
});

module.exports = SourceStore;
