import { Request, Response, NextFunction, Router } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response, next: NextFunction) => res.send('ecoleta v0.1'))

export default routes