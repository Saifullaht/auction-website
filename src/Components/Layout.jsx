import { div } from "framer-motion/client";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../App.css"
function  Layout(){
   return(
        <div >
        <Header/>
        <div className="  min-h-[600px]" >
            <Outlet/>
            </div>
            <Footer /> 
        </div>  
   )
}
export default Layout;