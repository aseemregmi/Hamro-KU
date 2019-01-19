import React, { Component } from 'react';
import passAuthProps from './passAuthProps';

const isAuthenticated = ComponentToCheckAuthentication => {
  class NewComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: props.auth
      };
    }

    static getDerivedStateFromProps(nextProps) {
      if (!nextProps.auth) {
        nextProps.history.push('/login?type=student');
      } else {
        if (nextProps.auth.type === 'admin') {
          nextProps.history.push('/login?type=student');
        }
      }
      return {
        auth: nextProps.auth
      };
    }

    componentDidMount() {
      if (!this.props.auth) {
        this.props.history.push('/login?type=student');
      } else {
        if (this.props.auth.type === 'admin') {
          this.props.history.push('/login?type=student');
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

  return passAuthProps(NewComponent);
};

export default isAuthenticated;
