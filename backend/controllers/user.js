import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

export const register = async (req, res) => {
    try {
        const { login, password, name, lastName, city, postalCode, street, propertyNumber, apartmentNumber, pesel, birthDate, gender, email, phoneNumber } = req.body

        const loginUser = await User.findOne({ login: login })
        if (loginUser) {
            return res.status(403).json({ msg: `User with login: ${login} already exists.` })
        }
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            return res.status(403).json({ msg: `User with email: ${email} already exists.` })
        }
        const peselUser = await User.findOne({ pesel: pesel })
        if (peselUser) {
            return res.status(403).json({ msg: `User with pesel: ${pesel} already exists.` })
        }

        const minLength = 8
        const maxLength = 15
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const numbers = '0123456789'.split('')
        const specialCharacters = '-_!*#$&'.split('')

        if (password.length < minLength)
            return res.status(400).json({ msg: 'Password must be above 8 characters!' })

        if (password.length > maxLength)
            return res.status(400).json({ msg: 'Password can contain up to 15 characters at most!' })

        let isUpperCase = false
        upperCaseLetters.map((char) => {
            if (password.includes(char)) isUpperCase = true
        })
        if (!isUpperCase) return res.status(400).json({ msg: 'Password must contain an upper case letter!' })

        let isLowerCase = false
        lowerCaseLetters.map((char) => {
            if (password.includes(char)) isLowerCase = true
        })
        if (!isLowerCase) return res.status(400).json({ msg: 'Password must contain a lower case letter!' })

        let isNum = false
        numbers.map((char) => {
            if (password.includes(char)) isNum = true
        })
        if (!isNum) return res.status(400).json({ msg: 'Password must contain a number!' })

        let isSpecialChar = false
        specialCharacters.map((char) => {
            if (password.includes(char)) isSpecialChar = true
        })
        if (!isSpecialChar) return res.status(400).json({ msg: 'Password must contain a special character!' })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ login, password: hashedPassword, name, lastName, location: { city, postalCode, street, propertyNumber, apartmentNumber }, pesel, birthDate, gender, email, phoneNumber })
        await newUser.save()

        return res.status(200).json(newUser)
    } catch (error) {
        console.error('Registration failed:', error)
        return res.status(500).json({ error: 'Registration failed.' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const loginUser = await User.findOne({ email: email })
        if (!loginUser) {
            return res.status(404).json({ msg: 'Please provide valid email and password.' })
        }

        if (loginUser.disabled) return res.status(500).json({ msg: 'User wanted to be deleted.' })

        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password)

        if (isPasswordCorrect) {
            console.log('Password matches. Login successful.')
            const secretKey = process.env.JWT_SECRET
            const token = jwt.sign(email, secretKey)
            res.cookie("token", token, { httpOnly: false, secure: true, path: '/', sameSite: 'none', expiresIn: '1d' })
            return res.status(200).json({ token, msg: 'Login success.', login: loginUser.login, resetPassword: loginUser.resetPassword })
        }
        else {
            console.log('Password does not match. Login failed.')
            return res.status(409).json({ msg: 'Please provide valid email and password.' })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Login failed.' })
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(404).json({ error: 'Token not found.', status: false })
        }

        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            return res.status(500).json({ error: 'JWT secret key is not configured.', status: false })
        }

        const decodedEmail = jwt.verify(token, secretKey)

        const checkUser = await User.find({ email: decodedEmail }).select('-password')
        if (!checkUser) {
            return res.status(404).json({ msg: "User not found.", status: false })
        }
        return res.status(200).json(checkUser)
    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed.', status: false })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ msg: `User with email: ${email} not found.`, status: false })
        }

        const minLength = 8
        const maxLength = 15
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '0123456789'
        const specialCharacters = '-_!*#$&'

        // Ensure the inclusion of at least one character from each required set
        const passwordArray = [
            upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)],
            lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            specialCharacters[Math.floor(Math.random() * specialCharacters.length)],
        ]

        const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters

        // Calculate the remaining length to fill (subtract 4 because we already have 4 characters guaranteed)
        const remainingLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength - 4

        for (let i = 0; i < remainingLength; i++) {
            passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)])
        }

        // Shuffle the array to ensure the order of characters is random
        const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)

        const password = shuffleArray(passwordArray).join('')

        // Sending email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDING_MAIL,
                pass: process.env.SENDING_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SENDING_MAIL,
            to: email,
            subject: 'Recovery password - Medical clinic',
            text: `Password: ${password}`
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Updating user
        await User.findOneAndUpdate({ email: email }, { password: hashedPassword, resetPassword: true })

        return res.status(201).json({ user: user, newPassword: password })
    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed.', status: false })
    }
}

export const resetPassword = async (req, res) => {
    const { login, newPassword, confirmPassword } = req.body
    const user = await User.findOne({ login: login })
    if (!user) {
        return res.status(404).json({ msg: `User with ${login} not found.`, status: false })
    }

    if (newPassword !== confirmPassword) return res.status(409).json({ msg: 'Please make sure both passwords are the same!' })

    const minLength = 8
    const maxLength = 15
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const numbers = '0123456789'.split('')
    const specialCharacters = '-_!*#$&'.split('')

    if (newPassword.length < minLength)
        return res.status(400).json({ msg: 'Password must be above 8 characters!' })

    if (newPassword.length > maxLength)
        return res.status(400).json({ msg: 'Password can contain up to 15 characters at most!' })

    let isUpperCase = false
    upperCaseLetters.map((char) => {
        if (newPassword.includes(char)) isUpperCase = true
    })
    if (!isUpperCase) return res.status(400).json({ msg: 'Password must contain an upper case letter!' })

    let isLowerCase = false
    lowerCaseLetters.map((char) => {
        if (newPassword.includes(char)) isLowerCase = true
    })
    if (!isLowerCase) return res.status(400).json({ msg: 'Password must contain a lower case letter!' })

    let isNum = false
    numbers.map((char) => {
        if (newPassword.includes(char)) isNum = true
    })
    if (!isNum) return res.status(400).json({ msg: 'Password must contain a number!' })

    let isSpecialChar = false
    specialCharacters.map((char) => {
        if (newPassword.includes(char)) isSpecialChar = true
    })
    if (!isSpecialChar) return res.status(400).json({ msg: 'Password must contain a special character!' })

    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)

    try {
        const latestPreviousPasswords = user.previousPasswords.slice(-3)
        console.log(latestPreviousPasswords)
        for (const pass of latestPreviousPasswords) {
            const isTheSame = await bcrypt.compare(newPassword, pass)
            if (isTheSame) return res.status(409).json({ msg: 'Please make sure that current password is not the same as any of your 3 latest passwords!' })
        }

        user.previousPasswords.push(newHashedPassword)
        user.password = newHashedPassword
        user.resetPassword = false
        await user.save()

        return res.status(201).json({ msg: 'Password successfully updated!', status: true });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ msg: 'Error updating password.', status: false });
    }
}