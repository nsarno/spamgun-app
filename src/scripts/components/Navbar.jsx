import React from 'react';
import Router from 'react-router';
import loginActions from 'LoginActions';
import AuthStore from 'AuthStore';

export default class Navbar extends React.Component {

  logout() {
    LoginActions.logout();
  }

  onAuthChange() {
    if (!AuthStore.isLoggedIn()) {
      window.location.replace('/#/login');
    }
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onAuthChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onAuthChange.bind(this));
  }

  render() {
    var logoutLink = () => {
      if (AuthStore.isLoggedIn()) {
        return (
          <li>
            <a onClick={this.logout}>
              <i className="fa fa-sign-out"></i>
            </a>
          </li>
        );
      }
    };
    
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse" data-target="#navbar-collapse"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <i className="fa fa-paper-plane" /> SpamGun
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {logoutLink()}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}
