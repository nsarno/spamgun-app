'use strict';

// var baseURL = "https://parrot-api.herokuapp.com";
var baseURL = "http://localhost:5000";

var ParrotClient = {
  loadSources: function(success, failure) {
    $.get(baseURL + "/sources")
      .done(success)
      .fail(failure);
  },

  refreshSource: function(id, success, failure) {
    $.get(baseURL + "/sources/" + id)
      .done(success)
      .fail(failure);
  },

  addSource: function(data, success, failure) {
    $.post(baseURL + "/sources", data)
      .done(success)
      .fail(failure);
  },

  updateSource: function(id, data, success, failure) {
    $.ajax({
      type: "PUT",
      url: baseURL + "/sources/" + id,
      data: { source: data }
    }).done(success)
      .fail(failure);
  },

  removeSource: function(source, success, failure) {
    $.ajax({
      type: "DELETE",
      url: baseURL + "/sources/" + source.data.id,
    }).done(success)
      .fail(failure);
  },

  scrapSource: function(source, success, failure) {
    var data = { 
      job: {
        name: 'scrapper',
        source_id: source.data.id
      }
    };

    $.post(baseURL + "/jobs", data)
      .done(success)
      .fail(failure);
  },

  spamSource: function(source, success, failure) {
    var data = { 
      job: {
        name: 'spammer',
        source_id: source.data.id
      }
    };

    $.post(baseURL + "/jobs", data)
      .done(success)
      .fail(failure);
  }
}

module.exports = ParrotClient;
