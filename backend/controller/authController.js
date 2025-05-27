exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  
  const validUser = {
    email: "admin@example.com",
    password: "admin123"
  };

  if (email === validUser.email && password === validUser.password) {
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
