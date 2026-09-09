import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/Hero';
import SearchBar from '../components/Searchbar';
import FeaturedCompanies from '../components/FeaturedCompanies';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';

const Home = () => {
  const { getUserData, userData, isLoggedIn } = useContext(AuthContext)

  useEffect(()=>{
    if(isLoggedIn){
      getUserData()
    }
  },[isLoggedIn])

  return (<>
  <div className='pt-24'>
    <Hero user ={userData}/>
    <SearchBar/>
    <FeaturedCompanies user={userData}/>
    <FeaturedJobs user={userData}/>
    <Footer/>
  </div>
  </>
  );
}

export default Home