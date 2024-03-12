import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { login, password, name, lastName, city, postalCode, street, propertyNumber, apartmentNumber, pesel, birthDate, gender, email, phoneNumber } = req.body

        console.log(req.body)
        const newUser = new User({ login, password, name, lastName, location: { city, postalCode, street, propertyNumber, apartmentNumber }, pesel, birthDate, gender, email, phoneNumber })
        await newUser.save()

        return res.status(200).json(newUser)
    } catch (error) {
        console.error('Registration failed:', error);
        return res.status(500).json({ error: 'Registration failed.' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const loginUser = await User.findOne({ email: email })
        if (!loginUser) {
            return res.status(404).json({ msg: 'User not found.' })
        }

        if (password === loginUser.password) {
            console.log('Password matches. Login successful.')
            const secretKey = process.env.JWT_SECRET
            const { email, isAdmin } = loginUser
            const token = jwt.sign({ email, isAdmin }, secretKey)
            res.cookie("token", token, { httpOnly: false, path: '/', sameSite: 'none' })
            res.cookie("token", token, { httpOnly: false, secure: true, path: '/', sameSite: 'none', expiresIn: '1d' })
            return res.status(200).json({ token, msg: 'Login success.' })
        }
        else {
            console.log('Password does not match. Login failed.')
            return res.status(409).json({ msg: 'Please provide valid email and password.' })
        }
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Login failed.' });
    }
}