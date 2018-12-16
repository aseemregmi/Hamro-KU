import React, { Component } from 'react';
import SideBar from '../adminpanel/SideBar';
import Students from '../adminpanel/Students';

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
        </div>
      </div>
    );
  }
}

export default AdminPanel;
