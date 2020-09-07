import { RouteBase } from '../../bases/route.base';
import { LocalAuthRoute } from './local/local-auth.routing';

export class AuthRoute extends RouteBase {

    private localAuthRoute!: LocalAuthRoute;

    protected initial(): void {
        this.localAuthRoute = new LocalAuthRoute();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.use('/local', this.localAuthRoute.router);
    }

}