import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { XIcon, MenuIcon } from '../../icons';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Toggle } from '../toggle/Toggle';
import { useTheme } from '../../context/ThemeContext';
import './header.css';

export const Header = ({ title, menuItems, user, onLogoutClick, onLoginClick, onSignUpClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        {user && (
          <nav className="header-nav-desktop">
            {menuItems.map(item => (
              <a key={item.name} href={item.href} className="header-nav-link">
                {item.name}
              </a>
            ))}
          </nav>
        )}
        <div className="header-right-side">
            <Toggle enabled={theme === 'dark'} setEnabled={toggleTheme} />
            {user ? (
                <div className="header-user-info">
                    <Avatar src={user.avatarUrl} alt={user.name} size="small"/>
                    <Button size="small" label="Log out" onClick={onLogoutClick} />
                </div>
            ) : (
                 <div className="header-login-info">
                   {onLoginClick && <Button size="small" label="Log in" onClick={onLoginClick} />}
                   {onSignUpClick && <Button size="small" primary label="Sign up" onClick={onSignUpClick} />}
                 </div>
            ) }
            <div className="header-mobile-menu-button-wrapper">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="header-mobile-menu-button">
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="header-nav-mobile">
          {user ? (
            <>
              {menuItems.map(item => (
                <a key={item.name} href={item.href} className="header-nav-link-mobile">
                  {item.name}
                </a>
              ))}
              <Button size="small" label="Log out" onClick={onLogoutClick} style={{marginTop: '1rem', width: '100%'}}/>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              {onLoginClick && <Button size="small" label="Log in" onClick={() => { onLoginClick(); setIsMenuOpen(false); }} style={{width: '100%'}}/>}
              {onSignUpClick && <Button size="small" primary label="Sign up" onClick={() => { onSignUpClick(); setIsMenuOpen(false); }} style={{width: '100%'}}/>}
            </div>
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
  })),
  user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
  }),
  onLogoutClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  onSignUpClick: PropTypes.func,
};

Header.defaultProps = {
    menuItems: [],
    user: null,
    onLogoutClick: () => {},
    onLoginClick: () => {},
    onSignUpClick: () => {},
}

export default Header;
