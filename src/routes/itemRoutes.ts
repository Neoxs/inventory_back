import express from 'express';
import { createItem, deleteItem, editItem, getAllItem } from '../controllers/itemController';

const router = express.Router();

router.post('/create', createItem)
router.patch('/edit/:id', editItem)
router.delete('/:id', deleteItem)

router.get('/', getAllItem)

export { router as itemRoutes };