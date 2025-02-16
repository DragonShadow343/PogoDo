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
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' data={data} element={<Home />} />
        {/* public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes */}
        <Route path='/admin' element={
          <RequireAuth allowedRoles={['admin']}>
            <Admin />
          </RequireAuth>
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
