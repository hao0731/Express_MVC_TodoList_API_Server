import { Request } from 'express';

import { ControllerBase } from '../../../bases/controller.base';

import { TodoService } from './todo.service';

import { ResponseObject } from '../../../common/response/response.object';

import { HttpStatus } from '../../../types/response.type';

export class TodoController extends ControllerBase {

    public todoSvc = new TodoService();

    public async getTodos(req: Request): Promise<ResponseObject> {
        const { limit, skip } = req.query;
        const dtos = await this.todoSvc.getTodos(Number(limit), Number(skip));
        return this.formatResponse(dtos, HttpStatus.OK);
    }

    public async getTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const dto = await this.todoSvc.getTodo(id);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async addTodo(req: Request): Promise<ResponseObject> {
        const { content } = req.body;
        const dto = await this.todoSvc.addTodo(content);
        return this.formatResponse(dto, HttpStatus.CREATED);
    }

    public async completedTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const { completed } = req.body;
        const dto = await this.todoSvc.completedTodo(id, completed);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async removeTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const dto = await this.todoSvc.removeTodo(id);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(null, HttpStatus.NO_CONTENT);
    }

}