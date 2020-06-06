import express from 'express'
import path from 'path'

import itemsRoutes from './items'
import pointsRoutes from './points'

const routes = express.Router()

routes.get('/', (req, res, next) => {
    return res.send('ecoleta v0.1')
})

routes.use('/items', itemsRoutes)
routes.use('/points', pointsRoutes)

routes.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

export default routes