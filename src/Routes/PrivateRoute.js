//hoc for rendering dashboard only if there is a current user.
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute(props){
    const Component = props.component
    const { currentUser } = useAuth();
    let location = useLocation();
    let component = currentUser?.email ? <Component /> : <Navigate to="/signin" state={{from: location}} />
    return (
            <>
                {component}
            </>
        )
}
