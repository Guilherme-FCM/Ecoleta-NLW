import { Request, Response } from 'express'
import knex from '../database/connection'

export default class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*')
        
        // Serealização
        items.map(item => {
            item.image_url = `http://localhost:3333/uploads/${item.image}`
            delete item.image
        })
    
        return response.json(items)
    }
}