import Dispatcher from 'Dispatcher';
import Constants from 'Constants';
import spamgunService from 'SpamgunService';

class LoginActions {

  login(username, password) {
    Dispatcher.dispatch({type: Constants.LOGIN});
    spamgunService.login(username, password,
      response => {
        Dispatcher.dispatch({
          type: Constants.LOGIN_SUCCESS,
          data: { jwt: response.jwt }
        });
      },
      error => {
        Dispatcher.dispatch({
          type: Constants.LOGIN_FAILURE,
          data: { error: error }
        });
      }
    );
  }

  logout() {
    Dispatcher.dispatch({type: Constants.LOGOUT});
  }
}

export default new LoginActions();