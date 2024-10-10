import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState()
  const [imagePreview, setImagePreview] = useState(null);

  let navigate = useNavigate()
  let data = localStorage.getItem("token")

  if (!data) {
    navigate("/login")
  }

  const handleImageUpload = (e) => {
    setImagePreview(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the preview to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanContent = content.replace(/<[^>]*>/g, '');
    // let blogData=new FormData()
    //   blogData.append("title",title) 
    //   blogData.append("content",cleanContent)
    //   blogData.append("file",imagePreview)
    //   console.log(blogData)

    try {

      const token = localStorage.getItem('token');

      let res = await axios.post('http://localhost:5000/api/blogs', { title, content: cleanContent }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(res)
      toast.success(res.data, toastOptions)
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (err) {
      console.error(err);
      toast.error(err.response.data, toastOptions)
    }
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-2 border mb-4 rounded-md"
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          className="mb-6"
          theme="snow"
        />
        <div className="border rounded-lg p-4 bg-card">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden" // Hide the file input
            id="imageUpload"
          />
          {image ? (
            <img alt="preview" src={image} className="rounded-md mb-2 w-20 h-20" />
          ) : (
            <span className="text-muted-foreground">Upload Image</span>
          )}
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="text-muted-foreground text-blue-800">Click here to upload an image</div>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md">
          Publish Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BlogEditor;
