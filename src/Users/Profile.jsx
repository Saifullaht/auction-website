import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import "./profile.css"
function UserProfile(){
    const {user} = useContext(AuthContext);
    const handlesignout = async() =>{
        await signOut(auth)
   
    }
   return(
       <div>
<h1 className="bid">User-profile</h1>

    {/* <div>
        <h1> Hello {user.displayName}</h1>

        <Button> LogOut</Button>
    </div> */}
<div>
  
    
          <div className="border100">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src= {user.photoUrl}
            />
            <div className="flex-grow mt-2">
              <h2 className="text-gray-900 title-font font-medium cursor-pointer">
                {user.displayName}
              </h2>
              <p className="text-gray-500 cursor-pointer">{user.email}</p>
            </div>
            <Button  color="primary"   variant="flat" className="btn-logout" onClick={handlesignout}> <LoginOutlined></LoginOutlined> LogOut</Button>
          </div>
         
  
</div>
 
       </div>
   )
}
export default  UserProfile;