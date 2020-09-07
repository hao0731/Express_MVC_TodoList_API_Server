import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';
import { EmailValidator } from '../validators';

const LocalAuthSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 12
        },
        password: {
            salt: {
                type: String,
                required: true
            },
            hash: {
                type: String,
                required: true
            }
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

export interface LocalAuthDocument extends CoreDocument {
    username: string;
    password: {
        salt: string;
        hash: string;
    };
    email: string;
}

export const LocalAuthModel = model<LocalAuthDocument>('User', LocalAuthSchema);