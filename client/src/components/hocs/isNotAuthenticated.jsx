import React, { Component } from 'react';
import { Consumer } from './../../context';

const isNotAuthenticated = ComponentToCheckAuthentication => {
  class NewComponent extends Component {
    state = { auth: null };

    static getDerivedStateFromProps(nextProps) {
      return { auth: nextProps.auth };
    }

    componentDidMount() {
      if (this.state.auth) {
        if (this.state.auth.type === 'admin') {
          this.props.history.push('/admin-panel');
        } else {
          this.props.history.push('/dashboard');
        }
      }
    }

    render() {
      return (
        <ComponentToCheckAuthentication
          {...this.props}
          auth={this.props.auth}
          dispatch={this.props.dispatch}
        />
      );
    }
  }

  const WithConsumer = props => {
    return (
      <Consumer>
        {value => (
          <NewComponent
            auth={value.auth}
            {...props}
            dispatch={value.dispatch}
          />
        )}
      </Consumer>
    );
  };

  return WithConsumer;
};

export default isNotAuthenticated;
