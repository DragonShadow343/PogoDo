// Desc: Main App component
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AuthContext from './context/AuthProvider'
// import axios from 'axios'
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import Chat from './components/universalComponents/WebSocket(CHAT)/Chat'


function App() {
  const { auth } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          
          {/* Chat route */}
          <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
