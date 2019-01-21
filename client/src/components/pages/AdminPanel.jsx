import React, { Component } from 'react';
import SideBar from '../adminpanel/SideBar';
import Students from '../adminpanel/Students';
import Teachers from '../adminpanel/Teachers';
import Subject from '../adminpanel/Subject';
import Group from '../adminpanel/Group';
import Departments from '../adminpanel/Departments';
import axios from 'axios';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/adminpanel/students');
    }
  }

  componentDidMount() {
    axios
      .post(`/api/tokens/token-user`, { token: this.props.auth.token })
      .catch(() => {
        this.props.dispatch({ type: 'REMOVE_TOKEN_FROM_LOCALSTORAGE' });
      });

    window.scrollTo(0, 0);
  }

  render() {
    const { token } = this.props.auth;
    return (
      <div className="adminpanel">
        <SideBar />
        <div className="adminpanel__main-section">
          {this.props.match.params.option === 'students' ? (
            <Students token={token} />
          ) : null}
          {this.props.match.params.option === 'teachers' ? (
            <Teachers token={token} />
          ) : null}
          {this.props.match.params.option === 'subjects' ? (
            <Subject token={token} />
          ) : null}
          {this.props.match.params.option === 'groups' ? (
            <Group token={token} />
          ) : null}
          {this.props.match.params.option === 'departments' ? (
            <Departments token={token} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdminPanel;
