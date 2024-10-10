import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

  let [text, setText] = useState("Create Blog")
  let [turn, setTurn] = useState(true)
  let token = localStorage.getItem("token")
  let navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  let handleText = () => {
    if (turn) {
      setText("Blog Feed")
      setTurn(false)
      navigate("/create-blog")
    }
    else {
      setText("Create Blog")
      setTurn(true)
      navigate("/")
    }
  }


  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">BlogApp</Link>
        <div className="space-x-4 mr-4">
          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Signup</Link>
            </>
          ) : (
            <>
              <button className="hover:text-gray-400" onClick={handleText}>{text}</button>
              <button onClick={logout} className="hover:text-gray-400">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
