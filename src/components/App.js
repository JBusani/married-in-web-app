import React from "react";
import Home from '../Routes/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/Signin';
import PrivateRoute from '../Routes/PrivateRoute';
import ForgotPassword from '../Routes/ForgotPassword';
import Dashboard from '../Routes/Dashboard';
import UpdateProfile from '../Routes/UpdateProfile';
import { Routes, Route } from 'react-router-dom';
import Layout from "./Layout";

/*<div className={styles.logo}>
        <img src={logo} alt="Married In Logo" />
      </div>
      <Outlet />
      <Navigation />
      <p style={{textAlign: "center", fontSize: ".7rem"}}>Married In &copy; {new Date().getFullYear()}</p>
  */
export default function App() {
 
  return (
    <div>

      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<PrivateRoute component={Dashboard}/>}>
              <Route path="update-profile" element={<PrivateRoute component={UpdateProfile}  />} />
              <Route path="*" element={<main style={{padding: "1rem"}}><p>There's nothing here...!</p></main>}/>
          </Route>
          <Route path="signup" element={<SignUp />}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="forgot-password" element={<ForgotPassword />}/>   
          <Route path="*" element={<main style={{padding: "1rem"}}><p>There's nothing here...!</p></main>}/>                 
        </Route>
      </Routes>
    </div>
  );
}
