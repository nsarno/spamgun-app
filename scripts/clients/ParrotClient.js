'use strict';

var ParrotClient = {
  loadSources: function(success, failure) {
    $.get("https://parrot-api.herokuapp.com/sources")
      .done(success)
      .fail(failure);
  },

  addSource: function(data, success, failure) {
    $.post("https://parrot-api.herokuapp.com/sources", data)
      .done(success)
      .fail(failure);
  },

  removeSource: function(source, success, failure) {
    console.log(source);
    $.ajax({
      type: "DELETE",
      url: "https://parrot-api.herokuapp.com/sources/" + source.data.id,
    }).done(success)
      .fail(failure);
  }
}

module.exports = ParrotClient;
