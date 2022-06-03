import { Document, ObjectId } from 'mongoose';

//  ==============================================================================
//  Modals
//  ==============================================================================
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  kind: string;
}

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface itemDocument extends Document {
  title: string;
  quantity: number;
  price: number;
  category: ObjectId;
}

export interface categoryDocument extends Document {
  title: string;
  nbItems: number;
}

//  ==============================================================================
//  Errors
//  ==============================================================================
export class ApiError extends Error {
  name: string;
  statusCode: number;
  isOperational: boolean;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'Error';
    this.statusCode = 400;
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}
