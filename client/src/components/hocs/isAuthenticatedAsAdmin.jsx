import React, { Component } from 'react';
import passAuthProps from './passAuthProps';

const isAuthenticatedAsAdmin = ComponentToCheckAuthentication => {
  class NewComponent extends Component {
    state = { auth: null };

    static getDerivedStateFromProps(nextProps) {
      return { auth: nextProps.auth };
    }

    componentDidUpdate() {
      if (!(this.state.auth && this.state.auth.type === 'admin')) {
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      if (!(this.state.auth && this.state.auth.type === 'admin')) {
        this.props.history.push('/');
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
  return passAuthProps(NewComponent);
};

export default isAuthenticatedAsAdmin;
