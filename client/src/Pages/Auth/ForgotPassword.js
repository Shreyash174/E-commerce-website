import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer });
        if (res && res.data.success) {
          toast.success(res.data.message);

          navigate('/login');
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };
  return (
    <Layout title='Forgot Password'>
            <div className="login">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="Enter your favorite color"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Reset</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword