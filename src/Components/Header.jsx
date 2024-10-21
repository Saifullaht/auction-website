import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { AccountBookOutlined, HomeOutlined, StockOutlined, UserAddOutlined, LoginOutlined } from "@ant-design/icons";
import { auth } from "../Utils/Firebase.js";
import { Avatar } from "@nextui-org/react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleAddProduct = () => {
        if (user && user.isLogin) {
            navigate("/Addproducts");  
        } else {
            navigate("/SignIn"); 
        }
    };
    
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { label: "Home", icon: <HomeOutlined />, link: "/" },
        { label: "About Us", icon: <AccountBookOutlined />, link: "/About" },
        { label: "All Products", icon: <StockOutlined />, link: "/Allproducts" },
        { label: "Log Out", icon: <UserAddOutlined />, action: () => auth.signOut() },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                <NavbarBrand>
                    <AcmeLogo />
                    <Link href="/"><p className="font-bold logotext logo">BidBazaar</p></Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                {menuItems.slice(0, 3).map((item, index) => (
                    <NavbarItem key={index}>
                        <Link href={item.link}>
                            {item.icon} {item.label}
                        </Link>
                    </NavbarItem>
                ))}
                {/* Show Add Products button on larger screens */}
                <NavbarItem>
                    <Button onClick={handleAddProduct} color="primary">
                        <UserAddOutlined /> Add Products
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                {auth.currentUser ? (
                    <div>
                        <Button as={Link} href="/User/Profile">
                            <Avatar isBordered color="primary  " src={user?.photoUrl} />
                        </Button>
                    </div>
                ) : (
                    <div className="btn">
                        <Button className="btn1 ml-20 " color="primary" as={Link} href="/SignIn" variant="flat">
                            <LoginOutlined /> Log In
                        </Button>
                    </div>
                )}
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        <Link
                            color={index === menuItems.length - 1 ? "danger" : "foreground"}
                            className="w-full"
                            href={item.link || "#"}
                            size="lg"
                            onClick={item.action}
                        >
                            {item.icon} {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {/* Add Products button in hamburger menu for smaller screens */}
                <NavbarMenuItem>
                    <Link onClick={handleAddProduct} color="foreground" className="w-full">
                        <UserAddOutlined /> Add Products
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

