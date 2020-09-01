import { Document } from 'mongoose';

export interface CoreDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}