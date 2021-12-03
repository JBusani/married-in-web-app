import React from "react";
import {Outlet} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";

export default function App() {

  return (
    <div>
      <Navigation />
      <Dashboard />
      <Outlet />
    </div>
  );
}
