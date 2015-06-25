var keymirror = require('keymirror');

module.exports = keymirror({
  CHANGE: null,

  LOAD_SOURCES: null,
  LOAD_SOURCES_SUCCESS: null,
  LOAD_SOURCES_FAILURE: null,

  ADD_SOURCE: null,
  ADD_SOURCE_SUCCESS: null,
  ADD_SOURCE_FAILURE: null,

  UPDATE_SOURCE: null,
  UPDATE_SOURCE_SUCCESS: null,
  UPDATE_SOURCE_FAILURE: null,

  REMOVE_SOURCE: null,
  REMOVE_SOURCE_SUCCESS: null,
  REMOVE_SOURCE_FAILURE: null,

  SCRAP_SOURCE: null,
  SCRAP_SOURCE_SUCCESS: null,
  SCRAP_SOURCE_FAILURE: null,
});
