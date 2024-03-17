import express from 'express'
import { getUserData, getUsers, searchUsers, editUser, disableUser } from '../controllers/admin.js'
import { register, login, getUser, forgotPassword } from '../controllers/user.js'

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

export default mainRouter