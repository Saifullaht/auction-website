import React from 'react';
import { Button, message } from 'antd';
import "../App.css"
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
 
import { auth, db } from "../utils/firebase"; // Correct case

import { setDoc , doc} from 'firebase/firestore';
import {    useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const handlelogingoogle = ()=>{ 
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup( auth, provider)
  .then((result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
     const user = result.user;
     console.log(result);
     const ref = doc( db , "users" , user.uid )
      setDoc(ref, {
      email: user.email,
      photoUrl: user.photoURL,
      uid: user.uid,
      displayName: user.displayName,
    }).then(() => {
      navigate("/");
      message.success(" Your account has been created");
    });
   }).catch((error) => {
   
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    message.success(errorMessage);
     
    const credential = GoogleAuthProvider.credentialFromError(error);

     
  });

  }
  return(
    <>
    <div className='main1'>

    <Button onClick={handlelogingoogle} className='m-10 button'>  <LogoutOutlined></LogoutOutlined> LogIn With Google</Button>

    </div>
    </>
  )
};

export default SignIn