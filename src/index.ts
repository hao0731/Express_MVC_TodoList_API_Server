import { App } from './app';
import { JWTException } from './exceptions/jwt.exception';
import { DefaultException } from './exceptions/default.exception';

const bootstrap = () => {
    const app = new App();
    app.setException(JWTException);
    app.setException(DefaultException);
    app.launchDatabase();
    app.bootstrap();
};

bootstrap();