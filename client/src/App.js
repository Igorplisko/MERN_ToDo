import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes'
// import { AutContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'

import './App.scss';


function App() {
  const rotes = useRoutes(isLogin)
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady }}>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App
