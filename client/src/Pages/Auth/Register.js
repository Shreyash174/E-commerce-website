import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import  toast from 'react-hot-toast';
import axios from 'axios'
import{useNavigate} from 'react-router-dom'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate()
   

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    try{
      const res = await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer})
      if(res && res.data.success){
        toast.success(res.data.message)
        navigate('/Login')
   }else{
    toast.error(res.data.message)
   }
     }catch(error){
   console.log(error)
   toast.error('something went wrong')
   }
  };

  return (
    <Layout title="Register - Ecommerce app">
      <div className="register">
        <h1>Registration Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="What is your favorite color"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
