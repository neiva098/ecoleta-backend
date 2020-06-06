import express from 'express'
import { Point } from '../interfaces/point'
import { insertPoint, getPoint } from '../controllers/points'

const routes = express.Router()

routes.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const point = await getPoint(id)

        return res.json(point)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

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