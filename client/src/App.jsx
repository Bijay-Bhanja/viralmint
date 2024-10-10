import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/BlogFeed';
import CreateBlogPage from './components/BlogEditor';
import Login from './components/Login';
import Signup from './components/Signup';
import "./index.css"

const App = () => {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
        </Routes>
      </Router>
   
  );
};

export default App;
