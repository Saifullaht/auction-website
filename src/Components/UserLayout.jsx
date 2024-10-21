import { Outlet } from "react-router";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./userlayout.css"


function UserLayout() {
  return (
    <div className="h-screen overflow-hidden w-screen">
      <Header />

      <div className="flex h-full  flex-grow">
        <div className="sidebar">
           <Link to={"/user/profile"}> <h1 className="profile ">Profile</h1></Link>
           <Link to={"/user/products"}> <h1 className="profile ">Product</h1></Link>
           <Link to={"/user/bids"}> <h1 className="profile ">Bids</h1></Link>
       
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default UserLayout;