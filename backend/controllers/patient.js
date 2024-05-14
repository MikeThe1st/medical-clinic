import Patient from "../models/Patient.js"

export const addPatient = async (req, res) => {
    try {
        const { name, lastName, city, postalCode, street, propertyNumber, apartmentNumber, pesel, birthDate, gender, email, phoneNumber } = req.body

        const emailUser = await Patient.findOne({ email: email })
        if (emailUser) {
            return res.status(403).json({ msg: `User with email: ${email} already exists.` })
        }
        const peselUser = await Patient.findOne({ pesel: pesel })
        if (peselUser) {
            return res.status(403).json({ msg: `User with pesel: ${pesel} already exists.` })
        }

        const newUser = new Patient({ name, lastName, location: { city, postalCode, street, propertyNumber, apartmentNumber }, pesel, birthDate, gender, email, phoneNumber })
        await newUser.save()

        return res.status(200).json(newUser)
    } catch (error) {
        console.error('Registration failed:', error)
        return res.status(500).json({ error: 'Registration failed.' })
    }
}

export const searchPatients = async (req, res) => {
    try {
        const {
            searchFirstName: name,
            searchLastName: lastName,
            searchPesel: pesel,
            searchCity: city,
            searchStreet: street,
            searchPhoneNumber: phoneNumber,
            searchEmail: email
        } = req.body;
        let query = {};
        let searchCriteria = [];

        if (name) {
            searchCriteria.push({ name: { $regex: `^${name}`, $options: 'i' } });
        }
        if (lastName) {
            searchCriteria.push({ lastName: { $regex: `^${lastName}`, $options: 'i' } });
        }
        if (pesel) {
            searchCriteria.push({ pesel: { $regex: `^${pesel}`, $options: 'i' } });
        }
        if (city) {
            searchCriteria.push({ 'location.city': { $regex: `^${city}`, $options: 'i' } });
        }
        if (email) {
            searchCriteria.push({ email: { $regex: `^${email}`, $options: 'i' } });
        }
        if (phoneNumber) {
            searchCriteria.push({ phoneNumber: { $regex: `^${phoneNumber}`, $options: 'm' } });
        }
        if (street) {
            searchCriteria.push({ 'location.street': { $regex: `^${street}`, $options: 'i' } });
        }

        if (searchCriteria.length > 0) {
            query = { $and: searchCriteria }
        }

        console.log(query, searchCriteria)
        const patients = await Patient.find(query).select('-password')

        return res.status(200).json(patients)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}