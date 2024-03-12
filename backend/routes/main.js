import express from 'express'
import { getUsers } from '../controllers/admin.js'
import { register, login } from '../controllers/user.js'

const mainRouter = express.Router()

mainRouter.get('/admin/users', getUsers)
mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)

export default mainRouter