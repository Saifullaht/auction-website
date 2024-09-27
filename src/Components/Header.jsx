import React, { useContext } from "react";
 
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import { AccountBookOutlined, BugOutlined, FileAddFilled, FileAddOutlined, HomeOutlined, LoadingOutlined, LoginOutlined, LogoutOutlined, PropertySafetyOutlined, StockOutlined, UserAddOutlined } from "@ant-design/icons";
 import { auth } from "../Utils/Firebase.js";

import { Avatar,   } from "antd";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
 

export default function Header() {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  console.log(user);
  const addproduct = ()=>{
      if(user.isLogin){
      
      }else{
        navigate("/SignIn")
      }
  }
  
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">BidBazaar</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {/* <Link color="foreground" href="/" >
            Home
          </Link> */}
        </NavbarItem>
        <NavbarItem  >
          <Link href=" /" aria-current="page">
          <HomeOutlined></HomeOutlined> Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href=" /About">
           <AccountBookOutlined></AccountBookOutlined>  AboutUs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Userproduct/:id">
          <PropertySafetyOutlined></PropertySafetyOutlined>
          Product
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Allproducts">
          <StockOutlined></StockOutlined>
             All Products
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="/Allproduct">
          <StockOutlined></StockOutlined>
             All Products
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      {/* <NavbarContent justify="end"> */}
        {/* <NavbarItem className="hidden lg:flex"> */}
          {/* <Link href="#">Login</Link> */}
        {/* </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/SignIn" variant="flat">
          <LoginOutlined></LoginOutlined>  Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      {
     auth.currentUser ? (
     <div>
      <Button as={Link} href="/Addproducts"  onClick={addproduct} className="Btn22" color="primary"   variant="flat"><UserAddOutlined></UserAddOutlined>  Add-Products
      </Button>
      <Avatar  src = {user?.photoUrl} /> 
     </div> ) : (
       <div className="btn">
       <Button className="btn1" color="primary" as={Link} href="/SignIn"  variant="flat">  <LoginOutlined></LoginOutlined> LogIn
          </Button>
    <Button   color="primary"   variant="flat"><UserAddOutlined></UserAddOutlined>  Add-Products
          </Button>
     </div>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
