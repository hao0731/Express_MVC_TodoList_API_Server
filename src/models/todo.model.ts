import { model, Schema } from 'mongoose';
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
        }
    },
    {
        timestamps: true
    }
);

export interface TodoDocument extends CoreDocument {
    content: string;
    completed: boolean;
};

export const TodoModel = model<TodoDocument>('Todo', TodoSchema);