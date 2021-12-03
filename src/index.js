import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/Signin';
const rootElement = document.getElementById('app')
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<App />} />
                        <Route path="signup" element={<SignUp />}/>
                        <Route path="signin" element={<SignIn />} />
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here...!</p>
                                </main>
                            }
                        />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
    , rootElement);