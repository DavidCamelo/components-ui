import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { XIcon, MenuIcon } from '../../icons';

export const Header = ({ title, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="storybook-header">
      <div className="storybook-header-container">
        <h1 className="storybook-header-title">{title}</h1>
        <nav className="storybook-header-nav-desktop">
          {menuItems.map(item => (
            <a key={item.name} href={item.href} className="storybook-header-nav-link">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="storybook-header-mobile-menu-button-wrapper">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="storybook-header-mobile-menu-button">
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="storybook-header-nav-mobile">
          {menuItems.map(item => (
            <a key={item.name} href={item.href} className="storybook-header-nav-link-mobile">
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
};

export default Header;