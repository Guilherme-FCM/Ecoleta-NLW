import { Request, Response } from 'express'
import knex from '../database/connection'

export default class PointsController {
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query 
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        return response.json(points)
    }

    async show(request: Request, response: Response){
        const { id } = request.params
        const point = await knex('points').select('*').where('id', id).first()

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')

        point.items = items.map(item => item.title)

        if (!point){ response.status(400).json({ message: "Ponto de coleta não encontrado." }) }
        return response.json(point)
    }

    async create(request: Request, response: Response){
        const transaction = await knex.transaction()

        const point = {
            image: 'https://conexaoto.com.br/image/92066_400x300_face.jpg',
            name: request.body.name,
            email: request.body.email,
            whatsapp: request.body.whatsapp,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
            city: request.body.city,
            uf: request.body.uf
        }
        
        const [ point_id ] = await transaction('points').insert(point)
        
        const pointItems = request.body.items.map(
            (item_id: number) => ({ item_id, point_id })
        )
        
        await transaction('point_items').insert(pointItems)
        await transaction.commit()
        
        return response.json({ id: point_id,...point })
    }
}