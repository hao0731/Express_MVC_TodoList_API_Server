import { TodoRepository } from '../../../repositories/todo.repository';

import { TodoDTO } from '../../../dtos/todo.dto';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { DefaultQuery } from '../../../types/request.type';

export class TodoService {

    private readonly todoRepo = new TodoRepository();

    public async getTodos(payload: JWTPayloadDTO, limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<TodoDTO[]> {
        const todos = await this.todoRepo.getTodos(payload._id, Math.min(limit, DefaultQuery.MAX_LIMIT), skip);
        const dtos = todos.map(todo => new TodoDTO(todo));
        return dtos;
    }

    public async getTodo(payload: JWTPayloadDTO, id: string): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.getTodo(payload._id, id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async addTodo(payload: JWTPayloadDTO, content: string): Promise<TodoDTO> {
        const document = await this.todoRepo.addTodo(payload._id, content);
        const dto = new TodoDTO(document);
        return dto;
    }

    public async completedTodo(payload: JWTPayloadDTO, id: string, completed: boolean): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.completedTodo(payload._id, id, completed);
        const dto =  todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async removeTodo(payload: JWTPayloadDTO, id: string): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.removeTodo(payload._id, id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

}