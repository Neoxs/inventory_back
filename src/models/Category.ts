import { Schema, Model, model } from 'mongoose';
import { categoryDocument } from '../helpers/types';

export const categorySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  nbItems: {
    type: Number,
    default: 0,
  },
});

export const Category: Model<categoryDocument> = model<categoryDocument>(
  'Category',
  categorySchema
);
