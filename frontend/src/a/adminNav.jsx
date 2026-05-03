// NavItem.js
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
export default function AdminNav() {
  const handleLogout = () => {
  // Remove token or user data
  localStorage.removeItem('token'); // or 'user', depending on what you stored
  // Redirect
  window.location.href = '/login'; // Replace with your login route
};
  return (
    <>
  <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
      <a className="sidebar-brand brand-logo text-white mt-5" >EVENT MANAGEMENT</a>
      {/* <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a> */}
    </div>
    <ul className="nav">
      <li className="nav-item profile">
        <div className="profile-desc">
          <div className="profile-pic">
            <div className="count-indicator">
              {/* <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt=""/> */}
              {/* <span className="count bg-success"></span> */}
            </div>
            <div className="profile-name">
              {/* <h5 className="mb-0 font-weight-normal">Event management system</h5> */}
              {/* <span>Gold Member</span> */}
            </div>
          </div>
          {/* <a href="#" id="profile-dropdown" data-bs-toggle="dropdown"><i className="mdi mdi-dots-vertical"></i></a> */}
          <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-dark rounded-circle">
                  <i className="mdi mdi-cog text-primary"></i>
                </div>
              </div>
              <div className="preview-item-content">
                <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
              </div>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-dark rounded-circle">
                  <i className="mdi mdi-onepassword  text-info"></i>
                </div>
              </div>
              <div className="preview-item-content">
                <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
              </div>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-dark rounded-circle">
                  <i className="mdi mdi-calendar-today text-success"></i>
                </div>
              </div>
              <div className="preview-item-content">
                <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
              </div>
            </a>
          </div>
        </div>
      </li>
      <li className="nav-item nav-category">
        {/* <span className="nav-link">Navigation</span> */}
      </li>
      <li className="nav-item menu-items">
        <NavLink className="nav-link" to="/admin">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <span className="menu-title">Dashboard</span>
        </NavLink>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <span className="menu-icon">
            <i className="mdi mdi-laptop"></i>
          </span>
          <span className="menu-title"> speaker </span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="ui-basic">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <NavLink className="nav-link" to="/speaker">Add speaker</NavLink></li>
            <li className="nav-item"> <NavLink className="nav-link" to="/showspeaker">show  speaker</NavLink></li>
          </ul>
        </div>
         <NavLink className="nav-link" to="/logout" >
          <span className="menu-icon">
            <i className="mdi mdi-speedometer"></i>
          </span>
          <Button 
  variant="contained" 
  color="error" 
  onClick={handleLogout}
  startIcon={<LogoutIcon />}
>
  Logout
</Button>
        </NavLink>
      </li>
      {/* <li className="nav-item menu-items">
        <a className="nav-link" href="pages/forms/basic_elements.html">
          <span className="menu-icon">
            <i className="mdi mdi-playlist-play"></i>
          </span>
          <span className="menu-title">Form Elements</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" href="pages/tables/basic-table.html">
          <span className="menu-icon">
            <i className="mdi mdi-table-large"></i>
          </span>
          <span className="menu-title">Tables</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" href="pages/charts/chartjs.html">
          <span className="menu-icon">
            <i className="mdi mdi-chart-bar"></i>
          </span>
          <span className="menu-title">Charts</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" href="pages/icons/font-awesome.html">
          <span className="menu-icon">
            <i className="mdi mdi-contacts"></i>
          </span>
          <span className="menu-title">Icons</span>
          <i className="menu-arrow"></i>
        </a>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
          <span className="menu-icon">
            <i className="mdi mdi-security"></i>
          </span>
          <span className="menu-title">User Pages</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="collapse" id="auth">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 505 </a></li>
            <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
          </ul>
        </div>
      </li>
      <li className="nav-item menu-items">
        <a className="nav-link" href="docs/documentation.html">
          <span className="menu-icon">
            <i className="mdi mdi-file-document"></i>
          </span>
          <span className="menu-title">Documentation</span>
        </a>
      </li> */}
    </ul>
  </nav>
  </>
  );
};

