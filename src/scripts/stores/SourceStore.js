var Dispatcher = require('Dispatcher');
var Constants = require('Constants');
var EventEmitter = require('events');
var DashboardActions = require('DashboardActions');
var _ = require('lodash');

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

  getSource: function(key) {
    return this.sources[key];
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
      var key = source.id;
      acc[key] = { key: key, data: source, status: 'ok' };
      return acc;
    }, {});
    this.emit(Constants.CHANGE);
  },

  onLoadSourcesError: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onRefreshSource: function(payload) {
    this.sources[payload.key].status = 'refreshing';
    this.emit(Constants.CHANGE);
  },

  onRefreshSourceSuccess: function(payload) {
    this.sources[payload.key].status = 'ok';
    this.sources[payload.key].data = payload.source;
    this.emit(Constants.CHANGE);
  },

  onRefreshSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.sources[payload.key].error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onAddSource: function(payload) {
    this.sources[payload.key] = { key: payload.key, data: payload.source, status: 'adding' };
    this.emit(Constants.CHANGE);
  },

  onAddSourceSuccess: function(payload) {
    this.sources[payload.key].status = 'ok';
    this.sources[payload.key].data = payload.source;
    this.emit(Constants.CHANGE);
  },

  onAddSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.sources[payload.key].error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onUpdateSource: function(payload) {
    this.sources[payload.key].status = 'updating';
    this.sources[payload.key].data = _.merge(this.sources[payload.key].data, payload.source);
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
    this.sources[payload.key].status = 'removing';
    this.emit(Constants.CHANGE);
  },

  onRemoveSourceSuccess: function(payload) {
    delete this.sources[payload.key];
    this.emit(Constants.CHANGE);
  },

  onRemoveSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.sources[payload.key].error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onScrapSource: function(payload) {
    this.sources[payload.key].status = 'run_scrapper';
    this.emit(Constants.CHANGE);
  },

  onScrapSourceSuccess: function(payload) {
    this.sources[payload.key].status = 'ok';
    this.emit(Constants.CHANGE);
  },

  onScrapSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.sources[payload.key].error = payload.error;
    this.emit(Constants.CHANGE);
  },

  onSpamSource: function(payload) {
    this.sources[payload.key].status = 'run_spammer';
    this.emit(Constants.CHANGE);
  },

  onSpamSourceSuccess: function(payload) {
    this.sources[payload.key].status = 'ok';
    this.emit(Constants.CHANGE);
  },

  onSpamSourceError: function(payload) {
    this.sources[payload.key].status = 'error';
    this.sources[payload.key].error = payload.error;
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

    case Constants.REFRESH_SOURCE:
      SourceStore.onRefreshSource(payload.data);
      break;

    case Constants.REFRESH_SOURCE_SUCCESS:
      SourceStore.onRefreshSourceSuccess(payload.data);
      break;

    case Constants.REFRESH_SOURCE_ERROR:
      SourceStore.onRefreshSourceError(payload.data);
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

    case Constants.SCRAP_SOURCE:
      SourceStore.onScrapSource(payload.data);
      break;

    case Constants.SCRAP_SOURCE_SUCCESS:
      SourceStore.onScrapSourceSuccess(payload.data);
      break;

    case Constants.SCRAP_SOURCE_ERROR:
      SourceStore.onScrapSourceError(payload.data);
      break;

    case Constants.SPAM_SOURCE:
      SourceStore.onSpamSource(payload.data);
      break;

    case Constants.SPAM_SOURCE_SUCCESS:
      SourceStore.onSpamSourceSuccess(payload.data);
      break;

    case Constants.SPAM_SOURCE_ERROR:
      SourceStore.onSpamSourceError(payload.data);
      break;

    default:
      return true;
  }
});

module.exports = SourceStore;
