/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import chalk from 'chalk';
import { Item } from '../models/Item';
import { Category } from '../models/Category';

import errorHandler from '../helpers/errorHandler';

/**
 * Get statistics.
 * @route Get /statistic/
 */

const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();

    const totalItems = await Item.aggregate([{ $count: 'total' }]);
    const totalCategories = await Category.aggregate([{ $count: 'total' }]);

    const todayItems = await Item.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      },
      { $count: 'total' },
    ]);

    const weekItems = await Item.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() - 7
            ),
          },
        },
      },
      { $count: 'total' },
    ]);

    res.status(200).json({
      status: 'success',
      statistics: {
        totalCategories: totalCategories[0] ? totalCategories[0].total : 0,
        totalItems: totalItems[0] ? totalItems[0].total : 0,
        todayItems: todayItems[0] ? todayItems[0].total : 0,
        weekItems: weekItems[0] ? weekItems[0].total : 0,
      },
    });
  } catch (error: any) {
    console.log(chalk.red(error));
    errorHandler(error, req, res);
  }
};

export { getData };
