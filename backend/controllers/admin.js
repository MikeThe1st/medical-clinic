import User from "../models/User.js"
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')

        return res.status(200).json(users)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const getUserData = async (req, res) => {
    try {
        const { login } = req.params
        const user = await User.findOne({ login }).select("-password")

        if (!user) {
            return res.status(404).json({ msg: `User with ${login} not found.` })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const searchUsers = async (req, res) => {
    try {
        const { login, email, name, lastName } = req.body
        let query = {};
        let searchCriteria = [];

        if (login) {
            searchCriteria.push({ login: { $regex: login, $options: 'i' } });
        }
        if (email) {
            searchCriteria.push({ email: { $regex: email, $options: 'i' } });
        }
        if (name) {
            searchCriteria.push({ name: { $regex: name, $options: 'i' } });
        }
        if (lastName) {
            searchCriteria.push({ lastName: { $regex: lastName, $options: 'i' } });
        }

        if (searchCriteria.length > 0) {
            query = { $and: searchCriteria }
        }

        console.log(query, searchCriteria)
        const users = await User.find(query).select('-password')

        return res.status(200).json(users)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const editUser = async (req, res) => {
    try {
        const { userData, previousLogin } = req.body
        const { login, email, pesel } = userData

        const emailUser = await User.findOne({ email: email, login: { $ne: previousLogin } })
        if (emailUser) {
            return res.status(403).json({ msg: `Email: ${email} already exists for another user.` });
        }
        const peselUser = await User.findOne({ pesel: pesel, login: { $ne: previousLogin } })
        if (peselUser) {
            return res.status(403).json({ msg: `PESEL: ${pesel} already exists for another user.` });
        }

        if (login !== previousLogin) {
            const loginUser = await User.findOne({ login: login })
            if (loginUser) {
                return res.status(403).json({ msg: `Login: ${login} already exists for another user.` });
            }
        }

        const updatedUser = await User.findOneAndUpdate({ login: previousLogin }, userData, { new: true })

        return res.status(201).json(updatedUser)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const disableUser = async (req, res) => {
    try {
        const { login } = req.body
        const disabledUser = await User.findOneAndUpdate({ login }, { disabled: true }).select('-password')

        return res.status(201).json(disabledUser)
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Disable failed.' });
    }
}
