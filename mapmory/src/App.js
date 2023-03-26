import './App.css';
import Welcome from './components/LandingPage/Welcome';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainPage from './components/Map/MainPage';
import { Typography } from '@mui/material';
import React from 'react';

//apparently you dont need to hide your client id
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

const App = () => {

    return (
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/mymap' element={<MainPage/>}/>
                <Route path='*' element={<Typography>Not found</Typography>}></Route>
            </Routes>
        </GoogleOAuthProvider>
    )
}

export default App;
