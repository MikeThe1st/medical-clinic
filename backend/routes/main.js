import express from 'express'
import { getUserData, getUsers, searchUsers, editUser, disableUser } from '../controllers/admin.js'
import { register, login, getUser, forgotPassword, resetPassword } from '../controllers/user.js'
import { getDoctors, getDoctor } from '../controllers/doctors.js'

const mainRouter = express.Router()

mainRouter.get('/admin/users', getUsers)
mainRouter.get('/admin/user-data/:login', getUserData)
mainRouter.post('/admin/search-users', searchUsers)
mainRouter.post('/admin/edit-user', editUser)
mainRouter.post('/admin/disable-user', disableUser)

mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
mainRouter.post('/user/forgot-password', forgotPassword)
mainRouter.post('/user/reset-password', resetPassword)

mainRouter.get('/doctor/doctors', getDoctors)
mainRouter.get('/doctor/:id', getDoctor)

export default mainRouter