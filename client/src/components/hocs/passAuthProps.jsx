import React, { Component } from 'react';
import { Consumer } from './../../context';

const passAuthProps = ComponentToCheckAuthentication =>
  class NewComponent extends Component {
    render() {
      return (
        <Consumer>
          {value => (
            <ComponentToCheckAuthentication
              {...this.props}
              auth={value.auth}
              dispatch={value.dispatch}
            />
          )}
        </Consumer>
      );
    }
  };

export default passAuthProps;
