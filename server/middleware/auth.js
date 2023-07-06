import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // Check if token exists
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Remove "Bearer " prefix from token if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET 
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user information to the request object
    req.user = verified;

    // Call the next middleware function
    next();
  } catch (err) {
    // Handle errors by sending a 500 status with the error message
    res.status(500).json({ error: err.message });
  }
};
