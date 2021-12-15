import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/Signin';
import PrivateRoute from './Routes/PrivateRoute';
import ForgotPassword from './Routes/ForgotPassword';
import Dashboard from './components/Dashboard';
import UpdateProfile from './Routes/UpdateProfile';

//maybe a uselocation can conditionally render a home page component

const rootElement = document.getElementById('app')
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<App />} >
                        <Route path="dashboard" element={<PrivateRoute component={Dashboard}/>} />
                        <Route path="update-profile" element={<PrivateRoute component={UpdateProfile}  />} />
                        <Route path="signup" element={<SignUp />}/>
                        <Route path="signin" element={<SignIn />}/>
                        <Route path="forgot-password" element={<ForgotPassword />}/>                    
                        <Route path="*" element={<main style={{padding: "1rem"}}><p>There's nothing here...!</p></main>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
    , rootElement);