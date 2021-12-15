import React from "react";
import {Outlet} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";
import picture from "../assets/marriedIn1.png"
export default function App() {

  return (
    <div>
      <Navigation />
      <img src={picture} alt="logo" />
      <Outlet />
    </div>
  );
}
