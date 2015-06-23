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
    this.sources = payload.sources.reduce(function(acc, source) {
      var id = _.uniqueId();
      acc[id] = { id: id, data: source, status: 'ok' };
      return acc;
    }, {});
    this.emit(Constants.CHANGE);
  },

  onLoadSourcesError: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onAddSource: function(payload) {
    this.sources[payload.id] = { id: payload.id, data: payload.source, status: 'adding' };
    this.emit(Constants.CHANGE);
  },

  onAddSourceSuccess: function(payload) {
    this.sources[payload.id].status = 'ok';
    this.sources[payload.id].data = payload.source;
    this.emit(Constants.CHANGE);
  },

  onAddSourceError: function(payload) {
    this.sources[payload.id].status = 'error';
    this.sources[payload.id].error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onUpdateSource: function(payload) {
    this.sources[payload.key].status = 'updating';
    this.emit(Constants.CHANGE);
  },

  onUpdateSourceSuccess: function(payload) {
    this.sources[payload.key].status = 'ok';
    this.emit(Constants.CHANGE);
  },

  onUpdateSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.emit(Constants.CHANGE);
  },

  onRemoveSource: function(payload) {
    this.sources[payload.id].status = 'removing';
    this.emit(Constants.CHANGE);
  },

  onRemoveSourceSuccess: function(payload) {
    delete this.sources[payload.id]
    this.emit(Constants.CHANGE);
  },

  onRemoveSourceError: function(payload) {
    this.sources[payload.id].status = 'error';
    this.sources[payload.id].error = payload.error;
    this.emit(Constants.CHANGE);
  }

});

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case Constants.LOAD_SOURCES:
      SourceStore.onLoadSources();
      break;

    case Constants.LOAD_SOURCES_SUCCESS:
      SourceStore.onLoadSourcesSuccess(payload.data);
      break;

    case Constants.LOAD_SOURCES_ERROR:
      SourceStore.onLoadSourcesError(payload.data);
      break;

    case Constants.ADD_SOURCE:
      SourceStore.onAddSource(payload.data);
      break;

    case Constants.ADD_SOURCE_SUCCESS:
      SourceStore.onAddSourceSuccess(payload.data);
      break;

    case Constants.ADD_SOURCE_ERROR:
      SourceStore.onAddSourceError(payload.data);
      break;

    case Constants.UPDATE_SOURCE:
      SourceStore.onUpdateSource(payload.data);
      break;

    case Constants.UPDATE_SOURCE_SUCCESS:
      SourceStore.onUpdateSourceSuccess(payload.data);
      break;

    case Constants.UPDATE_SOURCE_ERROR:
      SourceStore.onUpdateSourceError(payload.data);
      break;

    case Constants.REMOVE_SOURCE:
      SourceStore.onRemoveSource(payload.data);
      break;

    case Constants.REMOVE_SOURCE_SUCCESS:
      SourceStore.onRemoveSourceSuccess(payload.data);
      break;

    case Constants.REMOVE_SOURCE_ERROR:
      SourceStore.onRemoveSourceError(payload.data);
      break;

    default:
      return true;
  }
});

module.exports = SourceStore;
