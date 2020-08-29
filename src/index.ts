import { App } from './app';
import { DefaultException } from './exceptions/default.exception';

const bootstrap = () => {
    const app = new App();
    app.enableCors();
    app.enableHelmet();
    app.setException(DefaultException);
    app.bootstrap();
};

bootstrap();