import express from 'express';

import { RouteBase } from '../../../bases/route.base';
import { TodoController } from './todo.controller';

export class TodoRoute extends RouteBase {

    protected controller!: TodoController;

    constructor() {
        super();
    }

    protected initial(): void {
        this.controller = new TodoController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.route('/')
            .get(this.controller.getTodos)
            .post(express.json(), this.controller.addTodo);
        this.router.route('/:id')
            .get(this.controller.getTodo)
            .delete(this.controller.removeTodo);
        this.router.patch('/:id/completed', express.json(), this.controller.completedTodo);
    }

}