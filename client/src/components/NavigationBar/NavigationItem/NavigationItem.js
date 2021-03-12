import React from 'react';
import './NavigationItem.css';

const NavigationItem = props => {
  const { label, selected, handleClick } = props;

  return (
    <div
      className={ selected === label ? "NavigationItem Selected" : "NavigationItem"}
      onClick={() => handleClick(label)}  
    >{label}</div>
  );
}

export default NavigationItem;