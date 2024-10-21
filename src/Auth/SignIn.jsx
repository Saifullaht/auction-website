import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import "../App.css";
import { LogoutOutlined } from '@ant-design/icons';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../Utils/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        message.success("You are already logged in.", 1); // Show for 10 seconds
        navigate("/"); // Redirect to home if already logged in
      } else {
        message.info("Please, sir, first log in, and then you can go to the website."



, 10); // Show for 10 seconds
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  const handlelogingoogle = () => { 
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const ref = doc(db, "users", user.uid);
        setDoc(ref, {
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          displayName: user.displayName,
        }).then(() => {
          navigate("/");
          message.success("Your account has been created", 10); // Show for 10 seconds
        });
      }).catch((error) => {
        const errorMessage = error.message;
        message.error(errorMessage, 10); // Show for 10 seconds
      });
  };

  return (
    <div className='main1'>
      <Button onClick={handlelogingoogle} className='m-10 button'>
        <LogoutOutlined /> Log In With Google
      </Button>
    </div>
  );
};

export default SignIn;
