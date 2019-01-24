import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        auth: action.payload
      };

    case 'LOGOUT':
      axios
        .post('/api/tokens/delete', { token: state.auth.token })
        .then(res => {})
        .catch(err => {});
      localStorage.removeItem('auth');
      return {
        auth: null
      };

    case 'REMOVE_TOKEN_FROM_LOCALSTORAGE':
      localStorage.removeItem('auth');
      return {
        auth: null
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);
    let auth = null;
    const authFromLocalStorage = localStorage.getItem('auth');
    if (authFromLocalStorage !== undefined && authFromLocalStorage !== null) {
      auth = JSON.parse(authFromLocalStorage);
    }

    this.state = {
      auth: auth,
      dispatch: action => {
        this.setState(state => reducer(state, action));
      }
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
