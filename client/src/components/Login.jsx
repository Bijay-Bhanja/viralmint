import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token")
    if (user) {
      navigate('/')
    }
  }, [navigate])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/users/login", { email, password })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);

        toast.success("Login successful", toastOptions)
        setTimeout(() => {
          navigate("/")
        }, 1000)
      })
      .catch((error) => {
        toast.error(error.response.data, toastOptions)
        setEmail("");
        setPassword("");
      })
  };


  return (
    <div className='bg-blue-950 w-[100vw] h-[92.2vh] flex items-center'>
      <div className="container mx-auto w-[350px] border-solid p-4 border-1 rounded-md border-white h-[400px] my-auto shadow-lg shadow-white">
        <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-7'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
