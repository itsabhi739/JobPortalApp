import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/Hero';
import SearchBar from '../components/Searchbar';
import FeaturedCompanies from '../components/FeaturedCompanies';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const Home = () => {
  const { getUserData, userData, isLoggedIn } = useContext(AuthContext)

  useEffect(()=>{
    if(isLoggedIn){
      getUserData()
    }
  },[isLoggedIn])

  return (<>
  <Seo path="/" />
  <main className='pt-24'>
    <Hero />
    <SearchBar/>
    <FeaturedCompanies user={userData}/>
    <FeaturedJobs user={userData}/>
  </main>
  <Footer/>
  </>
  );
}

export default Home