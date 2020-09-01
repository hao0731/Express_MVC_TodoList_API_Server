import { App } from './app';
import { DefaultException } from './exceptions/default.exception';

const bootstrap = () => {
    const app = new App();
    app.setException(DefaultException);
    app.launchDatabase();
    app.bootstrap();
};

bootstrap();