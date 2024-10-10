import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  let data = localStorage.getItem("token")

  if (!data) {
    navigate("/login")
  }

  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-3xl font-bold mb-6">Blog Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.content.substring(0, 100)}...</p>
            <span className="block mt-4 text-gray-400 text-sm">Location: {blog.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
