import express from 'express';
import { createCategory, deleteCategory, editCategory, getAllCategories } from '../controllers/categoryController';

const router = express.Router();

router.post('/create', createCategory)
router.patch('/edit/:id', editCategory)
router.delete('/:id', deleteCategory)

router.get('/', getAllCategories)

export { router as categoryRoutes };