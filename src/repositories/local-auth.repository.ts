import crypto from 'crypto';
import { LocalAuthModel, LocalAuthDocument } from '../models/local-auth.model';

export class LocalAuthRepository {

    public async addUser(username: string, password: string, email: string): Promise<LocalAuthDocument> {
        const { salt, hash } = this.hashPassword(password);
        const user = new LocalAuthModel({
            username,
            password: { salt, hash },
            email
        });
        const document = await user.save();
        return document;
    }

    public async getUser(options: { username?: string, email?: string }): Promise<LocalAuthDocument | null> {
        const params = Object.keys(options).filter(key => !!(options as any)[key]).map(key => {
            return { [key]: (options as any)[key] };
        });
        const getCondition = () => {
            if ( params.length > 1 ) {
                return {
                    $or: params
                };
            }
            return params[0];
        };
        const user = await LocalAuthModel.findOne(getCondition());
        return user;
    }

    public hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): { salt: string, hash: string } {
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return { salt, hash };
    }

}