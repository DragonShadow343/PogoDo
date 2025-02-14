// Desc: Main App component
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import User from './pages/User';
import Admin from './pages/Admin';
import Missing from './pages/Missing';
import RequireAuth from './RequireAuth';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
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
            <User />
          </RequireAuth>
        } />

        {/* catch all */}
        <Route path='/*' element={<Missing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
