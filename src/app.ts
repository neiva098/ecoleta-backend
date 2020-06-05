import * as bodyParser from 'body-parser'
import * as express from 'express'

import routes from './routes'

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        require('dotenv').config()

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(routes)
        this.app.use(this.errorHandling.bind(this))
        this.app.disable('x-powered-by')
    }

    private errorHandling(error: any, req: any, res: any, next: any) {
        console.error(error)
        if (!error.code || error.code > 599) {
            error.code = 500
        }

        res.status(error.code).send(error)
        next()
    }
}

export default new App().app
