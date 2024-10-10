const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = process.env.JWT_SECRET;


// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({ username, email, password: hashedPassword });
      await user.save();

    res.status(201).json({
      message: "Register successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login an existing user
exports.loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
     
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log("error");
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

//get the current user profile
exports.getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send user data back
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
