import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from '@controllers/index'

class App {
    
    public app: express.Application

    public constructor() { 
        this.app = express()
        this.middlewaares()
        this.database()
        this.routes()
    }

    private middlewaares () : void {
        this.app.use(express.json())
        this.app.use(cors());
    }

    private database () : void {
        mongoose.connect('mongoose://localhost:27017/realEstate_v4')
    }

    private routes (): void {
        this.app.use(routes)
    }
}

export default new App().app