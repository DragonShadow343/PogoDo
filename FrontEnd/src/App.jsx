// Desc: Main App component
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import User from './pages/User';
import Admin from './pages/Admin';
import Missing from './pages/Missing';
import RequireAuth from './RequireAuth';

function App() {

  const [data, setData] = useState('')
  
  useEffect(() => {
    axios.get("http://localhost:3500/getData", {withCredentials: true}) // Call backend API
      .then((response) => {
        console.log("Response Data: ", response.data);
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home data={data} />} />
        <Route path='/home' element={<Home data={data} />} />
        {/* public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes */}
        <Route path='/admin' element={
          // <RequireAuth allowedRoles={['admin']}>
            <Admin />
          // </RequireAuth>
        } />
        <Route path='/user' element={
          <RequireAuth allowedRoles={['user', 'admin']}>
            <User/>
          </RequireAuth>
        } />

        {/* catch all */}
        <Route path='/*' element={<Missing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
