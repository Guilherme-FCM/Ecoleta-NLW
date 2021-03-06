import express from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const pointsController = new PointsController()
const itemsController = new ItemsController()

const routes = express.Router()

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', pointsController.create)
routes.get('/items', itemsController.index)

export default routes