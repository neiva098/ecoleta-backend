import express from 'express'
import { listItems } from '../controllers/items'

const routes = express.Router()

routes.get('/', async (req, res, next) => {
    try {
        const items = await listItems()

        return res.json(items)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

export default routes