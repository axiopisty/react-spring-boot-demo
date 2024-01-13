import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Bug Tracker</h1>
      <Outlet/>
    </>
  )
};

export default Layout;