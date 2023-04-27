import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react';
import Chat from './pages/Chat';
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const SetAvatar = React.lazy(() => import('./pages/SetAvatar'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={
          <Suspense fallback={<div> Redirecting to register page... </div>} >
            <Register /></Suspense>
        } />
        <Route path='/login' element={
          <Suspense fallback={<div> Redirecting to login page... </div>} >
            <Login /></Suspense>
        } />
        <Route path='/setAvatar' element={
          <Suspense fallback={<div> Redirecting to avatar selection page... </div>} >
            <SetAvatar /></Suspense>
        } />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
