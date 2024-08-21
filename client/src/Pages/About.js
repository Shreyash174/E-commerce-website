
import React from 'react';
import Layout from '../Components/Layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img
              src='/images/aboutus.png'
              alt='About us'
              style={{ width: '100%' }}
            />
          </div>
          <div className='col-md-6'>
            <h2>About us</h2>
            <p>
             
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
