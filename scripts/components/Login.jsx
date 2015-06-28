import React from "react";
import Router from "react-router";
import Form from "Form";
import LoginActions from "LoginActions";
import LoginStore from "LoginStore";
import DocumentTitle from 'react-document-title';

export default class Login extends React.Component {

  static willTransitionTo(transition) {
    if (LoginStore.isLoggedIn()) {
      transition.redirect('/');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onAuthChange() {
    if (LoginStore.isLoggedIn()) {
      window.location.replace('/#/dashboard');
    }
  }

  componentWillMount() {
    LoginStore.addChangeListener(this.onAuthChange.bind(this));
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.onAuthChange.bind(this));
  }

  handleLogin() {
    LoginActions.login(this.state.username, this.state.password);
  }

  handleChange(event) {
    var state = {}
    state[event.target.id] = event.target.value;
    this.setState(state);
  }

  render() {
    var fields = [
      {id: 'username', type: 'text', placeholder: 'Username', value: this.state.username},
      {id: 'password', type: 'password', placeholder: 'Password', value: this.state.password},
    ];

    return (
      <div id="login" className="container">
        <DocumentTitle title="SpamGun | Sign in" />
        <div className="login-box">
          <Form handleChange={this.handleChange.bind(this)} fields={fields} />
          <button className="btn btn-primary" onClick={this.handleLogin.bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}
