//hoc for rendering dashboard only if there is a current user.
import React from 'react';
import { useLocation, Navigate, Route, Outlet} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../components/Dashboard';

export default function PrivateRoute(props){
    const Comp = props.component
    const { currentUser } = useAuth();
    let location = useLocation();
    let component = currentUser?.email ? <Comp /> : <Navigate to="/signin" state={{from: location}} />
    return (
            <>
                {component}
            </>
        )
}
