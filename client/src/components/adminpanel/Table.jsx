import React from 'react';

const Table = props => {
  return (
    <div className="table">
      <div className="heads">
        {props.headers.map(header => (
          <span key={header} className="field">
            {header}
          </span>
        ))}
      </div>
      <div className="data">
        {props.data.map((student, index) => {
          if (index > 10) return null;
          return (
            <div
              className="fields"
              onClick={() => {
                props.handleDataInModal(student);
                props.handleDisplayModal();
              }}
              key={student.email}
            >
              <span className="field">{student.name}</span>
              <span className="field">{student.email}</span>
              <span className="field">{student.group.shortForm}</span>
              <span className="field">
                {student.verified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
