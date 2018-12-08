import React, { Component } from 'react';
import passAuthProps from './passAuthProps';

const isAuthenticated = ComponentToCheckAuthentication => {
  class NewComponent extends Component {
    state = { auth: null };

    static getDerivedStateFromProps(nextProps) {
      return { auth: nextProps.auth };
    }

    componentDidMount() {
      if (!this.state.auth) {
        this.props.history.push('/login?type=student');
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

export default isAuthenticated;
