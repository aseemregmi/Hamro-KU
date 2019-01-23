import React from 'react';

const Table = props => {
  return (
    <div className="table">
      <div
        className="heads"
        style={{ gridTemplateColumns: `repeat(${props.headers.length}, 1fr)` }}
      >
        {props.headers.map(header => (
          <span key={header} className="field">
            {header}
          </span>
        ))}
      </div>
      <div className="data">
        {props.data.map((data, index) => {
          return (
            <div
              className="fields"
              style={{
                gridTemplateColumns: `repeat(${props.headers.length}, 1fr)`
              }}
              onClick={() => {
                props.handleDataInModal(data);
                props.handleDisplayModal();
              }}
              key={data.email}
            >
              <span className="field">
                {data[props.headers[0].toLowerCase()]}
              </span>
              <span className="field">
                {data[props.headers[1].toLowerCase()]}
              </span>
              {props.studentTable ? (
                <React.Fragment>
                  <span className="field">{data.group.shortForm}</span>
                  <span className="field">
                    {data.specialAuthority ? 'Granted' : 'Not Granted'}
                  </span>
                </React.Fragment>
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
