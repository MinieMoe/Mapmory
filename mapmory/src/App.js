import './App.css';
import Welcome from './components/LandingPage/Welcome';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainPage from './components/Map/MainPage';
import { Typography } from '@mui/material';
import React from 'react';
import { AuthProvider } from './AuthContext/AuthContext'
import { Outlet } from 'react-router-dom';

//apparently you dont need to hide your client id
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

// Wrap all routes that have sensitive information inside AuthProvider
const AuthContextLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

const App = () => {

    return (
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route element={<AuthContextLayout />}>
                    <Route path='/mymap' element={<MainPage/>}/>
                    <Route path='/profile' element={<Typography>My profile</Typography>}/>
                </Route>
                <Route path='*' element={<Typography>Not found</Typography>}></Route>
            </Routes>
        </GoogleOAuthProvider>
    )
}

export default App;
