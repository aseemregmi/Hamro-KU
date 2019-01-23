import React, { Component } from 'react';
import passAuthProps from './passAuthProps';

const isAuthenticatedAsAdmin = ComponentToCheckAuthentication => {
  class NewComponent extends Component {
    state = { auth: null };

    static getDerivedStateFromProps(nextProps) {
      if (!nextProps.auth) {
        nextProps.history.push('/login?type=admin');
      } else if (!(nextProps.auth && nextProps.auth.type === 'admin')) {
        nextProps.history.push('/login?type=admin');
      }
      return { auth: nextProps.auth };
    }

    render() {
      if (!this.props.auth) {
        return null;
      }
      return (
        <ComponentToCheckAuthentication
          {...this.props}
          auth={this.props.auth}
          dispatch={this.props.dispatch}
        />
      );
    }
  }
  return passAuthProps(NewComponent);
};

export default isAuthenticatedAsAdmin;
