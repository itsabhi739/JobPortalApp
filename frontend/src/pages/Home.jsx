import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/Hero';
import SearchBar from '../components/Searchbar';
import FeaturedCompanies from '../components/FeaturedCompanies';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';

const Home = () => {
  const {backendURL,inputClass} = useContext(AuthContext)
  return (<>
  <div className='pt-24'>
    <Hero/>
    <SearchBar/>
    <FeaturedCompanies/>
    <FeaturedJobs/>
    <Footer/>
  </div>
  </>
  );
}

export default Home