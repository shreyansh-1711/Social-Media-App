import User from "../models/User"

//Read 
export const getUser = async (req, res) => {
  try {
    const { id} = req.params;
    const users = await User.findById(id);
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
} 

export const getUserFriends = await (req, res) => {
    const { id } = req.params;
    const users = await User.findById(id);

    const friends = await  Promise.all(
        users.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({_id, firstname, lastname, occupation, location, picturePath}) => {
            return {_id, firstname, lastname, occupation, location, picturePath}
        }
    );

    res.stat

}