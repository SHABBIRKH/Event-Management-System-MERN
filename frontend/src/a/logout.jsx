import React from 'react'

export default function Logout() {
    localStorage.removeItem('token'); // or 'user', depending on what you stored
      // Redirect
      window.location.href = '/login'; 
  return (
    <></>
  )
}
