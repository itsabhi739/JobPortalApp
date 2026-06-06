import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const {getUserData,isLoggedIn,userData,setUserData} = useContext(AuthContext)
  return (<>
  <div className='pt-24'>
    Hi {userData?userData.username:"Developer"}
  </div>
  </>
  );
}

export default Home