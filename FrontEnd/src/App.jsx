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

  const [data, setData] = useState('');
  const { auth } = useContext(AuthContext);
  
  // useEffect(() => {
  //   axios.get("http://localhost:3500/getData", {withCredentials: true}) // Call backend API
  //     .then((response) => {
  //       console.log("Response Data: ", response.data);
  //       setData(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.error("Axios error:", error);
  //     });
  // }, []);

  
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
