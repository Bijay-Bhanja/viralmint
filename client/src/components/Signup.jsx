import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate=useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }


  const handleRegister = (e) => {
    e.preventDefault(); // Prevent the default form submission


    if (email === "" || password === "" || username === "") {
      alert("Please fill in all fields");
    } else {
      axios.post("http://localhost:5000/api/users/register", { username, email, password })
        .then((res) => {
          console.log(res)
          toast.success(res.data.message, toastOptions)

          setEmail("");
          setPassword("");
          setUsername("")
          setTimeout(()=>{
            navigate("/")
          },1000)
        })
        .catch((error) => {

          console.log(error)
          toast.error(error.response.data, toastOptions)
          setEmail("");
          setPassword("");
          setUsername("")


        });

    }
  };

  return (
    <div className='bg-blue-950 w-[100vw] h-[92.2vh] flex items-center'>
    <div className="container mx-auto w-[350px] border-solid p-4 border-1 rounded-md border-white h-[400px] my-auto shadow-lg shadow-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Signup</h1>
      <form onSubmit={handleRegister} className='flex flex-col items-center justify-center gap-7'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border mb-4 rounded-md"
        />
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
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Signup;
