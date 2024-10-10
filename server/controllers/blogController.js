const Blog = require('../models/Blog');
// const geoip = require('geoip-lite');


// Create a new blog
exports.createBlog = async (req, res) => {

  const { title, content } = req.body;
//   const { ip } = req.headers['x-forwarded-for'] || req.ip;
  // console.log(ip)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from header

  try {
    // const location = await getLocationFromIP(ip);
    // console.log(location)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(ip) 
  // const publicIp = ip === '::1' || ip === '127.0.0.1' ? '8.8.8.8' : ip;
  // const geoRes = await axios.get(`http://freegeoip.net/json/ip `);
  // console.log(geoRes)

  // const ipRes = await axios.get('https://api.ipify.org?format=json');
  // console.log(ipRes)
  // const publicIp = ipRes.data.ip;
  // console.log('Public IP:', publicIp);
  // const geoRes = await axios.get(`https://ipapi.com/${publicIp}?access_key=${token}`);

  // const geoRes = await axios.get(`http://api.ipstack.com/check?access_key=${token}`);
  // const geoRes = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${token}`);
  // const response = await axios.get(`http://ip-api.com/json/${ip}`);
  // console.log(response)
 


    const blog = new Blog({
      title,
      content,
      // location: { city, region, country },
      // imageUrl:req.file  
      // user: req.user.id, // Set the user ID based on JWT authentication
    });
   
  
    
  
   
    res.status(201).send("Data saved successfully");
    await blog.save();
    
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

// Get all blogs by location
exports.getBlogs = async (req, res) => {


  try {
    const blogs = await Blog.find({})
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
