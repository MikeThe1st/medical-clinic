import express from 'express'
import { getUserData, getUsers, searchUsers, editUser, disableUser, switchRole, changeUserRights, searchUsersByRights, getPatient } from '../controllers/admin.js'
import { register, login, getUser, forgotPassword, resetPassword } from '../controllers/user.js'
import { getDoctors, getDoctor, addDoctorWorkingDate } from '../controllers/doctors.js'
import { addPatient, searchPatients, editPatient, reserveVisit, getAllReservations } from '../controllers/patient.js'

const mainRouter = express.Router()

mainRouter.get('/admin/users', getUsers)
mainRouter.get('/admin/user-data/:login', getUserData)
mainRouter.post('/admin/search-users', searchUsers)
mainRouter.post('/admin/edit-user', editUser)
mainRouter.post('/admin/disable-user', disableUser)
mainRouter.post('/admin/switch-user-role', switchRole)
mainRouter.post('/admin/change-user-rights', changeUserRights)
mainRouter.post('/admin/search-by-rights', searchUsersByRights)
mainRouter.get('/admin/patient-data/:id', getPatient)

mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
mainRouter.post('/user/forgot-password', forgotPassword)
mainRouter.post('/user/reset-password', resetPassword)

mainRouter.get('/doctor/doctors', getDoctors)
mainRouter.get('/doctor/:id', getDoctor)
mainRouter.post('/doctor/add-working-date', addDoctorWorkingDate)

mainRouter.post('/patient/add-patient', addPatient)
mainRouter.post('/patient/search', searchPatients)
mainRouter.post('/patient/edit', editPatient)
mainRouter.post('/patient/reserve-visit', reserveVisit)
mainRouter.get('/patient/reservations', getAllReservations)

export default mainRouter