import express from 'express';
import multer from 'multer';
import {celebrate, Joi} from 'celebrate';
import multerConfig from '../config/multer';

import PointsController from '../controllers/PoinstsController';
import ItemsController from '../controllers/ItemsController';

import { pointValidate } from '../validate/pointValidate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points',
    upload.single('image'),
    pointValidate(),
    pointsController.create
);

export default routes;