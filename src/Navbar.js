import React from 'react';
import './Navbar.css';

const Navbar = ({ activeOption, onOptionChange }) => {
  const currentDate = new Date().toLocaleDateString(undefined, {
    
    day: 'numeric',
  });

  return (
    <div className="navbar">
      <div className="navbar-top">
        <span className="date">{currentDate}</span>
      </div>
      <ul className="navbar-menu">
        <li className={activeOption === 'todo' ? 'active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); onOptionChange('todo'); }}>
            Todo Tasks
          </a>
        </li>
        <li className={activeOption === 'completed' ? 'active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); onOptionChange('completed'); }}>
            Completed Tasks
          </a>
        </li>
        <li className={activeOption === 'important' ? 'active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); onOptionChange('important'); }}>
            Important Tasks
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

