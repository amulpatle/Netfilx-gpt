import React from 'react';
import Header from './Header';
import { useState,useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {

  const [isSignForm,setIsSignInForm] = useState(true)
  const [errorMessaage,setErrorMessage] = useState(null)
  const name = useRef(null);
  const email = useRef(null)
  const password = useRef(null);
  
  const dispatch = useDispatch()
 
  const handleButtonClick = () =>{
    // console.log(email.current.value)
    // console.log(password.current.value)
    const messsage = checkValidData(email.current.value,password.current.value)
    setErrorMessage(messsage)

    if(!isSignForm){
      // sign up logic
      
      createUserWithEmailAndPassword(
        auth, 
        email.current.value,
        password.current.value
      )

      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name?.current?.value, photoURL:"https://avatars.githubusercontent.com/u/81820783?v=4"
        }).then(() => {
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(
            
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
          )
          
        }).catch((error) => {
          setErrorMessage(error.message)
        });
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
        // ..
      });

    }else{
      // Sign In
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        
        const user = userCredential.user;
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
      });
    }


  }

  const toggelSignInForm = ()=>{
    setIsSignInForm(!isSignForm)
  }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img 
              src='https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg'
              alt='Logo'
            />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg'>
        <h1 className='font-bold text-3xl py-4'>{isSignForm?"Sign In":"Sign Up"}</h1>
            {!isSignForm && <input 
              type='text' 
              placeholder='Full Name' 
              className='p-4 my-4 w-full bg-gray-700' 
            />}
            <input 
              ref={email}
              type='text' 
              placeholder='Email Address' 
              className='p-4 my-4 w-full bg-gray-700' 
            />
            <input 
              ref={password}
              type='password' 
              placeholder='Password' 
              className='p-4 my-4 w-full bg-gray-700' 
            />
            <p className='text-red-500 font-bold text-lg py-2 '>{errorMessaage}</p>
            <button 
            className='p-4 my-6 bg-red-700 w-full rounded-lg'
            onClick={handleButtonClick}
            >
              {isSignForm?"Sign In":"Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggelSignInForm}>
              {isSignForm 
              ?"New to Netflix? Sign Up Now"
              :"Already Registered? Sign In Now."}</p>
        </form>
    </div>
  );
}

export default Login;
