const express = require('express');
const { createBlog ,getBlogs} = require('../controllers/blogController');
const  protect  = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>  {
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
  })
  const upload=multer({
    storage:storage
  })

router.post('/',protect, upload.single("file"), createBlog);  
router.get('/', getBlogs);

module.exports = router;
