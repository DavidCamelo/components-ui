import React, { useState, useEffect } from 'react';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Login } from './components/login/Login';
import { Modal } from './components/modal/Modal';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import { SignUp } from './components/sign-up/SignUp';
import { Tabs } from './components/tabs/Tabs';
import { DashboardPage } from './pages/DashboardPage';
import { SchedulePage } from './pages/SchedulePage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('mock_user')));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const menuItems = [ { name: 'Home', href: '#' }, { name: 'About', href: '#' }, { name: 'Services', href: '#' } ];
  const tabs = [{ name: 'Schedule', content: <SchedulePage /> }, { name: 'Dashboard', content: <DashboardPage /> }];
  const userData = {
    name: 'Test User',
    avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=TU',
    accessToken: 'xyz123',
    refreshToken: 'abc456'
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (!storedUser) {
      localStorage.setItem('mock_user', JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  // Mock authentication service
  const authService = {
      signup: async (name, lastname, email, password) => {
          console.log("Creating user login with:", { name, lastname, email, password });
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  if (email === 'test@example.com' && password === 'password') {
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
      localStorage.setItem('mock_user', JSON.stringify(userData));
      setUser(userData);
      setIsLoginModalOpen(false);
  };

  const handleSignUpSuccess = (userData) => {
      localStorage.setItem('mock_user', JSON.stringify(userData));
      setUser(userData);
      setIsSignUpModalOpen(false);
  };

  const handleLogout = () => {
      localStorage.removeItem('mock_user');
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
        <PrivateRoute hasPermission={user}
          children={<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
          fallbackMessage="Please log in to view this content. Try with 'test@example.com' and 'password'."/>
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