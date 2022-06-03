import { Schema, Model, model } from 'mongoose';
import { itemDocument } from '../helpers/types';

export const itemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item: Model<itemDocument> = model<itemDocument>(
  'Item',
  itemSchema
);
