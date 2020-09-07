import { RouteBase } from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';
import { AuthRoute } from './main/auth/auth.routing';

export class AppRoute extends RouteBase {

    private apiRoute!: ApiRoute;
    private authRoute!: AuthRoute;

    constructor() {
        super();
    }

    protected initial(): void {
        this.apiRoute = new ApiRoute();
        this.authRoute = new AuthRoute();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.use('/api', this.apiRoute.router);
        this.router.use('/auth', this.authRoute.router);
    }

};