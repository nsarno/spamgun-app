var ParrotClient = {
  loadSources: function(success, failure) {
    $.get("https://parrot-api.herokuapp.com/sources")
      .done(function(data) {
        success(data);
      })
      .fail(function(data) {
        failure(data);
      });
  }
}

module.exports = ParrotClient;
