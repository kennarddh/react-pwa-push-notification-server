import express from 'express'

// Controllers
import { Subscribe, Send } from '../Controllers/Subscribe'

const Router = express.Router()

Router.post('/subscribe', Subscribe)
Router.post('/send', Send)

export default Router
