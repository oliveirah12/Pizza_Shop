import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";


export function Dashboard(){
  return (
    <div>
      <title>Pizza Shop | Dashboard</title>
      <Helmet title="Dashboard" />


      <div>
        <Outlet />
      </div>
    </div>
  )
}