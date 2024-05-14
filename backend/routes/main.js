import express from 'express'
import { getUserData, getUsers, searchUsers, editUser, disableUser, switchRole, changeUserRights, searchUsersByRights } from '../controllers/admin.js'
import { register, login, getUser, forgotPassword, resetPassword } from '../controllers/user.js'
import { getDoctors, getDoctor } from '../controllers/doctors.js'
import { addPatient, searchPatients } from '../controllers/patient.js'

const mainRouter = express.Router()

mainRouter.get('/admin/users', getUsers)
mainRouter.get('/admin/user-data/:login', getUserData)
mainRouter.post('/admin/search-users', searchUsers)
mainRouter.post('/admin/edit-user', editUser)
mainRouter.post('/admin/disable-user', disableUser)
mainRouter.post('/admin/switch-user-role', switchRole)
mainRouter.post('/admin/change-user-rights', changeUserRights)
mainRouter.post('/admin/search-by-rights', searchUsersByRights)

mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
mainRouter.post('/user/forgot-password', forgotPassword)
mainRouter.post('/user/reset-password', resetPassword)

mainRouter.get('/doctor/doctors', getDoctors)
mainRouter.get('/doctor/:id', getDoctor)

mainRouter.post('/patient/add-patient', addPatient)
mainRouter.post('/patient/search', searchPatients)

export default mainRouter