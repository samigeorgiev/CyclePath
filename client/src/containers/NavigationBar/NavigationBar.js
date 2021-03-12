import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationItem from '../../components/NavigationBar/NavigationItem/NavigationItem';
import './NavigationBar.css';

const NavigationBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  let history = useHistory();

  const handleNavigation = label => {
    setSelectedItem(label);
    history.push(label);
  }

  return (
    <div className="NavigationBar">
      <NavigationItem label="Map" selected={selectedItem} handleClick={(label) => handleNavigation(label)} />
      <NavigationItem label="Home" selected={selectedItem} handleClick={(label) => handleNavigation(label)} />
    </div>
  );
}

export default NavigationBar;