import { TodoRepository } from '../../../repositories/todo.repository';

import { TodoDTO } from '../../../dtos/todo.dto';
import { DefaultQuery } from '../../../types/request.type';

export class TodoService {

    private readonly todoRepo = new TodoRepository();

    public async getTodos(limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<TodoDTO[]> {
        const todos = await this.todoRepo.getTodos(Math.min(limit, DefaultQuery.MAX_LIMIT), skip);
        const dtos = todos.map(todo => new TodoDTO(todo));
        return dtos;
    }

    public async getTodo(id: string): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.getTodo(id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async addTodo(content: string): Promise<TodoDTO> {
        const document = await this.todoRepo.addTodo(content);
        const dto = new TodoDTO(document);
        return dto;
    }

    public async completedTodo(id: string, completed: boolean): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.completedTodo(id, completed);
        const dto =  todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async removeTodo(id: string): Promise<TodoDTO | null> {
        const todo = await this.todoRepo.removeTodo(id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

}