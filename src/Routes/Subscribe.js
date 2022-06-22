import express from 'express'

// Controllers
import { Subscribe } from '../Controllers/Subscribe'

const Router = express.Router()

Router.post('/subscribe', Subscribe)

export default Router
