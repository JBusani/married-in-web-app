import App from './components/App';
import {createRoot} from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

//react 18
const container = document.getElementById('app');
const root = createRoot(container);
root.render( 
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter> 
    </React.StrictMode>
    );