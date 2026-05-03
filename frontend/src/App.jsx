import { useState } from 'react'
import './App.css'
import Login from './login'
import Home from "./home";
import Register from "./register";
import { BrowserRouter as Router,Routes,Route, Navigate, Outlet } from 'react-router-dom';
import Admin from './a/admin';
import Speaker from './a/speaker';
import Layout from './layout'
import AdminLayout from './adminlayout'
import Showspeaker from './a/showspeaker'
import Editspeaker from './a/editspeaker'
import { Logout } from '@mui/icons-material';


function App() {
  const [count, setCount] = useState(0)
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  // Private Route component defined inside App
  const AdminProtectedRoute = () => {
    return isAdminLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };


  return (
    <>
      
      <Router>
        <Routes>
          {/* <Route path='/' element={<Home/>}></Route> */}
          <Route element={<Layout/>}>
          <Route index path ='/' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          
          </Route>
        </Routes>

        <Routes>
              <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout/>}>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/speaker' element={<Speaker/>}></Route>
            <Route path='/showspeaker' element={<Showspeaker/>}></Route>
            <Route  path ="/editspeaker/:id" element={<Editspeaker/>}> </Route>
             
            </Route>
          </Route>
        </Routes>

      </Router>
    </>
  )
}

export default App
