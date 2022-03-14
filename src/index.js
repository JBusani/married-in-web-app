import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

//maybe a uselocation can conditionally render a home page component

const rootElement = document.getElementById('app')
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter> 
    </React.StrictMode>
    , rootElement);