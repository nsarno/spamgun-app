import AuthStore from 'AuthStore';
import $ from 'jquery';

class BaseService {

  constructor() {
    this.baseURL = 'http://localhost:5000';
  }

  ajax(method, url, data, success, failure) {
    $.ajax({
      method: method,
      url: `${this.baseURL}${url}`,
      data: data,
      headers: {
        Authorization: 'Bearer ' + AuthStore.jwt
      }
    }).done(success)
      .fail(failure);
  }

  get(url, success, failure) {
    this.ajax('GET', url, {}, success, failure);
  }

  post(url, data, success, failure) {
    this.ajax('POST', url, data, success, failure);
  }

  put(url, data, success, failure) {
    this.ajax('PUT', url, data, success, failure);
  }

  delete(url, success, failure) {
    this.ajax('DELETE', url, {}, success, failure);
  }
}

class SpamgunService extends BaseService {

  constructor() {
    super();
    // @if ENV='production'
    this.baseURL = "https://spamgun-api.herokuapp.com";
    // @endif
  }

  login(email, password, success, failure) {
    var data = {auth: {email: email, password: password }};
    this.post('/knock/auth_token', data, success, failure);
  }

  loadSources(success, failure) {
    this.get('/sources', success, failure);
  }

  refreshSource(id, success, failure) {
    this.get(`/sources/${id}`, success, failure);
  }

  addSource(data, success, failure) {
    this.post('/sources', data, success, failure);
  }

  updateSource(id, data, success, failure) {
    this.put(`/sources/${ id }`, { source: data }, success, failure);
  }

  removeSource(source, success, failure) {
    this.delete(`/sources/${source.data.id}`, success, failure);
  }

  scrapSource(source, success, failure) {
    var data = { job: { name: 'scrapper', source_id: source.data.id }};
    this.post('/jobs', data, success, failure);
  }

  spamSource(source, success, failure) {
    var data = { job: { name: 'spammer', source_id: source.data.id }};
    this.post('/jobs', data, success, failure);
  }
}

export default new SpamgunService();
