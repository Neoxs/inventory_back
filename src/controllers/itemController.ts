/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import chalk from 'chalk';
import { Item } from '../models/Item';

import errorHandler from '../helpers/errorHandler';
import { Category } from '../models/Category';

/**
 * Create a new item.
 * @route POST /items/create
 */

const createItem = async (req: Request, res: Response): Promise<void> => {
  const { title, price, quantity, category } = req.body;
  try {
    const categoryObj = await Category.findById(category);
    const item = await new Item({
      title,
      price,
      quantity,
      category,
    }).save();

    const data = await Item.aggregate([
      {
        $match: { category: item.category },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
      { $limit: 1 },
    ]);

    categoryObj.nbItems = data[0].count;

    await categoryObj.save();

    res.status(201).send({ status: 'success', item });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Get all items.
 * @route GET /items
 */

const getAllItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.aggregate([
      {
        $lookup: {
          from: Category.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);

    res.status(200).json({ status: 'success', items });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Update item.
 * @route POST /items/:id
 */

const editItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, price, quantity, category } = req.body;
    const item = await Item.findById(id);

    item.title = title ? title : item.title;
    item.price = price ? price : item.price;
    item.quantity = quantity ? quantity : item.quantity;
    item.category = category ? category : item.category;

    item.save();

    res
      .status(200)
      .json({ status: 'success', message: 'Item updated successfully' });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

/**
 * Delete item.
 * @route DELETE /items/:id
 */

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    const categoryObj = await Category.findById(item.category);

    if (categoryObj) {
      const data = await Item.aggregate([
        {
          $match: { category: item.category },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
        { $limit: 1 },
      ]);

      categoryObj.nbItems = data.length > 0 ? data[0].count : 0;

      await categoryObj.save();
    }

    res.status(200).json({ status: 'success', item });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

export { createItem, getAllItem, editItem, deleteItem };
