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
        {props.data.map((data, index) => {
          if (index > 10) return null;
          return (
            <div
              className="fields"
              onClick={() => {
                props.handleDataInModal(data);
                props.handleDisplayModal();
              }}
              key={data.email}
            >
              <span className="field">{data.name}</span>
              <span className="field">{data.email}</span>
              {props.studentTable ? (
                <span className="field">{data.group.shortForm}</span>
              ) : null}
              {props.teacherTable ? (
                <span className="field">{data.department.name}</span>
              ) : null}

              <span className="field">
                {data.verified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
