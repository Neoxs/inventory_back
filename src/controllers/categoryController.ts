/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import chalk from 'chalk';
import { Category } from '../models/Category';

import errorHandler from '../helpers/errorHandler';
import { Item } from '../models/Item';

/**
 * Create a new category.
 * @route POST /categories/create
 */

const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  try {
    const category = await new Category({
      title,
    }).save();

    res.status(201).send({ status: 'success', category });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Get all categories.
 * @route GET /categories
 */

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({});

    const data = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    categories.forEach((category) => {
      data.forEach((entry) => {
        if (entry._id === category._id) {
          category['count'] = entry.count;
        }
      });
    });

    res.status(200).json({ status: 'success', categories });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Update category.
 * @route POST /categories/:id
 */

const editCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    console.log(id)

    const category = await Category.findById(id);

    category.title = title ? title : category.title;

    await category.save();

    res
      .status(200)
      .json({ status: 'success', message: 'Category updated successfully' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Delete category.
 * @route DELETE /categories/:id
 */

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    res.status(200).json({ status: 'success', category });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

export { createCategory, getAllCategories, editCategory, deleteCategory };
