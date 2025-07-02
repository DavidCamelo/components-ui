import React, { useState } from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Modal from './components/modal/Modal';
import PrivateRoute from './components/private-route/PrivateRoute';
import SignUp from './components/sign-up/SignUp';
import DashboardPage from './pages/DashboardPage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const menuItems = [ { name: 'Home', href: '#' }, { name: 'About', href: '#' }, { name: 'Services', href: '#' } ];

  // Mock authentication service
  const authService = {
      signup: async (name, lastname, email, password) => {
          console.log("Creating user login with:", { name, lastname, email, password });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  if (email === 'test@example.com' && password === 'password') {
                      const userData = {
                          name: 'Test User',
                          avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=TU',
                          accessToken: 'xyz123',
                          refreshToken: 'abc456'
                      };
                      console.log("Create user successful", userData);
                      resolve(userData);
                  } else {
                      console.log("Create failed");
                      reject(new Error('User already exists. Please try again.'));
                  }
              }, 1000);
          });
      },
      login: async (username, password) => {
          console.log("Attempting login with:", { username, password });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  if ((username === 'test' || username === 'test@example.com') && password === 'password') {
                      const userData = {
                          name: 'Test User',
                          avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=TU',
                          accessToken: 'xyz123',
                          refreshToken: 'abc456'
                      };
                      console.log("Login successful", userData);
                      resolve(userData);
                  } else {
                      console.log("Login failed");
                      reject(new Error('Invalid credentials. Please try again.'));
                  }
              }, 1000);
          });
      },
  };

  const handleLoginSuccess = (userData) => {
      setUser(userData);
      setIsLoginModalOpen(false);
  };

  const handleSignUpSuccess = (userData) => {
      setUser(userData);
      setIsSignUpModalOpen(false);
  };

  const handleLogout = () => {
      setUser(null);
  };

  return (
    <div className="app-container" style={{fontFamily: 'sans-serif'}}>
      <Header
        title="ComponentLib"
        menuItems={menuItems}
        user={user}
        onLogoutClick={handleLogout}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignUpClick={() => setIsSignUpModalOpen(true)}
      />
      <main style={{padding: '2rem'}}>
        <PrivateRoute hasPermission={user} children={<DashboardPage />} fallbackMessage="Please log in to view this content. Try with 'test@example.com' and 'password'."/>
      </main>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Member Login">
          <Login service={authService} onLoginSuccess={handleLoginSuccess} onCancel={() => setIsLoginModalOpen(false)} />
      </Modal>
      <Modal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} title="Create Account">
          <SignUp service={authService} onSignUpSuccess={handleSignUpSuccess} onCancel={() => setIsSignUpModalOpen(false)} />
      </Modal>
      <Footer text="© 2024 Component Library, Inc. All Rights Reserved." />
    </div>
  );
}