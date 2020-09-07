import JWTGuard from 'express-jwt';
import { RouteBase } from '../../bases/route.base';
import { TodoRoute } from './todo/todo.routing';

export class ApiRoute extends RouteBase {

    private todoRoute!: TodoRoute;

    constructor() {
        super();
    }

    protected initial(): void {
        this.todoRoute = new TodoRoute();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.use(JWTGuard({ secret: (process.env.JWT_SIGN as string), userProperty: 'payload', algorithms: ['HS256'] }));
        this.router.use('/todos', this.todoRoute.router);
    }

}