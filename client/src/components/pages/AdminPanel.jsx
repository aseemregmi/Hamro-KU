import React, { Component } from 'react';
import SideBar from '../adminpanel/SideBar';
import Students from '../adminpanel/Students';
import Teachers from '../adminpanel/Teachers';
import Subject from '../adminpanel/Subject';
import Group from '../adminpanel/Group';
import Departments from '../adminpanel/Departments';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    if (!this.props.match.params.option) {
      this.props.history.push('/adminpanel/students');
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="adminpanel">
        <SideBar />
        <div className="adminpanel__main-section">
          {this.props.match.params.option === 'students' ? <Students /> : null}
          {this.props.match.params.option === 'teachers' ? <Teachers /> : null}
          {this.props.match.params.option === 'subjects' ? <Subject /> : null}
          {this.props.match.params.option === 'groups' ? <Group /> : null}
          {this.props.match.params.option === 'departments' ? (
            <Departments />
          ) : null}
        </div>
      </div>
    );
  }
}

export default AdminPanel;
