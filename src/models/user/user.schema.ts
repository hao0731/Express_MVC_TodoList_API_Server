import mongoose from 'mongoose';
import { EmailValidator } from '../../validators';

export const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 16
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: EmailValidator
            }
        }
    }
);