

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../Footer';

 

const MainLayout = () => {
 

  return (
    <>
      <Navbar />

    
        
   
      


      <main  className="min-h-[calc(100vh-200px)] py-6">
        <Outlet />
      </main>

    <Footer/>
    </>
  );
};

export default MainLayout;
