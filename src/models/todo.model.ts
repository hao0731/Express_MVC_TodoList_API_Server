import { model, Schema, Types } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const TodoSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        owner: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

export interface TodoDocument extends CoreDocument {
    content: string;
    completed: boolean;
    owner: string;
};

export const TodoModel = model<TodoDocument>('Todo', TodoSchema);