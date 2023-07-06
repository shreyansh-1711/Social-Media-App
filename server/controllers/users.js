import User from "../models/User.js";

/* READ */
// Controller function to retrieve a user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID using the User model
    const user = await User.findById(id);

    // Respond with the user data
    res.status(200).json(user);
  } catch (err) {
    // Handle errors by sending a 404 status with the error message
    res.status(404).json({ message: err.message });
  }
};


// Controller function to retrieve a user's friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID using the User model
    const user = await User.findById(id);

    // Retrieve the friends' information
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friends' information for response
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with the formatted friends' information
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle errors by sending a 404 status with the error message
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
