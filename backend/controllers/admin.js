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
        const user = await User.findOne({ login })

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

const updateUser = async (filter, update) => {
    try {
        // Construct the update object with non-empty fields
        const nonEmptyUpdate = {};

        if (update.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(update.password, salt)
            update.password = hashedPassword
        }

        const arrayOfLocations = ['city', 'postalCode', 'street', 'propertyNumber', 'apartmentNumber'];

        for (const key in update) {
            console.log(`Key ${key}`)
            if (key == 'location') {
                const dbLocation = await User.findOne(filter, 'location');

                const locationUpdate = { ...dbLocation.location }

                // Iterate over the keys of the location object in the update
                for (const field in update.location) {
                    if (arrayOfLocations.includes(field) && update.location[field] !== '') {
                        locationUpdate[field] = update.location[field];
                    }
                }

                nonEmptyUpdate.location = locationUpdate
            } else if (update[key] !== '') {
                nonEmptyUpdate[key] = update[key];
            }
        }
        console.log(nonEmptyUpdate)
        const updatedUser = await User.findOneAndUpdate(filter, nonEmptyUpdate, { new: true })

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const editUser = async (req, res) => {
    try {
        const { userData, previousLogin } = req.body
        console.log(userData, previousLogin)

        const query = { login: previousLogin }
        const updatedUser = await updateUser(query, userData)

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
