import express from 'express'
import { Point } from '../interfaces/point'
import { insertPoint } from '../controllers/points'

const routes = express.Router()

routes.post('/', async (req, res, next) => {
    try {
        const {point, items} = req.body

        const insertResult = await insertPoint(point, items)

        res.json(insertResult)
        
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

export default routes