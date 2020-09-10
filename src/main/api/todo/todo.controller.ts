import { Request } from 'express';

import { ControllerBase } from '../../../bases/controller.base';

import { TodoService } from './todo.service';

import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { ResponseObject } from '../../../common/response/response.object';

import { HttpStatus } from '../../../types/response.type';

export class TodoController extends ControllerBase {

    private readonly todoSvc = new TodoService();

    public async getTodos(req: Request): Promise<ResponseObject> {
        const { limit, skip } = req.query;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dtos = await this.todoSvc.getTodos(payload, Number(limit), Number(skip));
        return this.formatResponse(dtos, HttpStatus.OK);
    }

    public async getTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dto = await this.todoSvc.getTodo(payload, id);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async addTodo(req: Request): Promise<ResponseObject> {
        const { content } = req.body;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dto = await this.todoSvc.addTodo(payload, content);
        return this.formatResponse(dto, HttpStatus.CREATED);
    }

    public async completedTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const { completed } = req.body;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dto = await this.todoSvc.completedTodo(payload, id, completed);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async removeTodo(req: Request): Promise<ResponseObject> {
        const { id } = req.params;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dto = await this.todoSvc.removeTodo(payload, id);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(null, HttpStatus.NO_CONTENT);
    }

}