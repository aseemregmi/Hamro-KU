import React from 'react';

const Input = props => {
  return (
    <div className="form__form-group">
      {props.label ? <label>{props.label}</label> : null}
      <input
        placeholder={props.placeholder}
        name={props.name}
        type={props.type ? props.type : 'text'}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Input;
