import React from 'react';
import Layout from '../Components/Layout/Layout';
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  return (
    <Layout>
      <div className='row contactus'>
        <div className='col-md-6'>
          <img
            src='/images/contactus.jpg'
            alt='contactus'
            style={{ width: "100%" }}
          />
        </div>
        <div className='col-md-4'>
          <h4 className='bg-dark p-2 text-white text-center'>Contact Us</h4>
          <p className='text-justify mt-3'>
            Any query and info about the product, feel free to call anytime. We are available 24x7.
          </p>
          <p className='mt-3'>
            <MdAlternateEmail /> shreyash@ecommerce.com
          </p>
          <p className='mt-3'>
            <FaPhone /> 7798656774
          </p>
          <p className='mt-3'>
            <FaLocationDot /> xyz
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
