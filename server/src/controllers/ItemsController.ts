import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index (req : Request, res: Response) { 
        const items = await knex('items').select('*');
    
        const serializedItem = items.map(item => {
            return {
                id : item.id,
                title : item.title,
                img_url : `http://192.168.0.124:3333/uploads/${item.image}`
            }
        });
    
        return res.json(serializedItem);
    }
}

export default ItemsController;