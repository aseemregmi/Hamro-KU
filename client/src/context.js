import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('auth', JSON.stringify(action.payload));
      console.log(action);
      return {
        auth: action.payload
      };

    case 'LOGOUT':
      localStorage.removeItem('auth');
      console.log('Inside Action');
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
    const auth = localStorage.getItem('auth');

    this.state = {
      auth: auth === 'undefined' ? null : auth,
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
