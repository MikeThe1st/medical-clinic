import User from "../models/User.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})

        return res.status(200).json(users)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}