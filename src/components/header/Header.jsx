import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { XIcon, MenuIcon } from '../../icons';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import './header.css';

export const Header = ({ title, menuItems, user, onLogout, onLoginClick }) => {
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
        <div className="header-right-side">
            {user ? (
                <div className="header-user-info">
                    <Avatar src={user.avatarUrl} alt={user.name} size="small"/>
                    <Button size="small" label="Log out" onClick={onLogout} />
                </div>
            ) : (
                <div className="header-login-info">
                     <Button size="small" primary label="Log in" onClick={onLoginClick} />
                </div>
            )}
            <div className="storybook-header-mobile-menu-button-wrapper">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="storybook-header-mobile-menu-button">
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="storybook-header-nav-mobile">
          {menuItems.map(item => (
            <a key={item.name} href={item.href} className="storybook-header-nav-link-mobile">
              {item.name}
            </a>
          ))}
           {user ? (
                <Button size="small" label="Log out" onClick={onLogout} style={{marginTop: '1rem', width: '100%'}}/>
           ) : (
                <Button size="small" primary label="Log in" onClick={onLoginClick} style={{marginTop: '1rem', width: '100%'}}/>
           )}
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
  user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
  }),
  onLogout: PropTypes.func,
  onLoginClick: PropTypes.func,
};

Header.defaultProps = {
    user: null,
    onLogout: () => {},
    onLoginClick: () => {},
}

export default Header;
