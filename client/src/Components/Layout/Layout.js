import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
const Layout = (porps) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Ecommerce</title>
            </Helmet>
     <Header/>
     <main style={{minHeight:'80vh'}}>
     <Toaster />
     {porps.children}
     </main>
     <Footer/>
    </div>
  )
}

export default Layout