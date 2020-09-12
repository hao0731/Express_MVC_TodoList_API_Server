import { body } from 'express-validator';

import { PipeBase } from '../../../bases/pipe.base';
import { EmailValidator } from '../../../validators';

export class LocalAuthSignupPipe extends PipeBase {

    public transform(): any[] {
        return [
            body('username')
            .isLength({ min: 3, max: 12 }).withMessage('使用者名稱需 3 ~ 12 字元')
            .matches(/^[A-Za-z0-9_]+$/).withMessage('使用者名稱只能含有大小寫英文字母、數字與底線')
            .notEmpty().withMessage('使用者名稱不得為空'),
            body('password')
            .isLength({ min: 8, max: 20 }).withMessage('密碼長度需 8 ~ 20 字元')
            .matches(/^[A-Za-z0-9]+$/).withMessage('密碼只能含有大小寫英文字母與數字')
            .notEmpty().withMessage('密碼不得為空'),
            body('email')
            .custom(value => EmailValidator(value)).withMessage('請確認是否符合 email 格式')
            .notEmpty().withMessage('email 不得為空'),
            this.validationHandler
        ];
    }

}