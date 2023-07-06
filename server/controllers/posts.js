import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
// Controller function to create a new post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    // Find the user by ID using the User model
    const user = await User.findById(userId);

    // Create a new Post instance with the provided data
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts (including the newly created post)
    const posts = await Post.find();

    // Respond with the updated list of posts
    res.status(201).json(posts);
  } catch (err) {
    // Handle errors by sending a 409 status with the error message
    res.status(409).json({ message: err.message });
  }
};


/* READ */
// Controller function to retrieve feed posts
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts using the Post model
    const posts = await Post.find();

    // Respond with the array of posts
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors by sending a 404 status with the error message
    res.status(404).json({ message: err.message });
  }
};


// Controller function to retrieve posts by a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find posts by the specified userId using the Post model
    const posts = await Post.find({ userId });

    // Respond with the array of posts
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors by sending a 404 status with the error message
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
// Controller function to handle post liking
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post by ID using the Post model
    const post = await Post.findById(id);

    // Check if the post is already liked by the user
    const isLiked = post.likes.get(userId);

    // Toggle the like status based on whether it's already liked or not
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post with the modified likes and retrieve the updated post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Respond with the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors by sending a 404 status with the error message
    res.status(404).json({ message: err.message });
  }
};
