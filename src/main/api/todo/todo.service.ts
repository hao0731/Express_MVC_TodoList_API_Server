import { QueryFindOneAndUpdateOptions } from 'mongoose';

import { TodoModel } from '../../../models/todo.model';

import { TodoDTO } from '../../../dtos/todo.dto';
import { DefaultQuery } from '../../../types/request.type';

export class TodoService {

    public async getTodos(limit: number = DefaultQuery.LIMIT, skip: number = DefaultQuery.SKIP): Promise<TodoDTO[]> {
        const todos = await TodoModel.find().skip(skip).limit(Math.min(limit, DefaultQuery.MAX_LIMIT));
        const dtos = todos.map(todo => new TodoDTO(todo));
        return dtos;
    }

    public async getTodo(id: string): Promise<TodoDTO | null> {
        const todo = await TodoModel.findById(id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async addTodo(content: string): Promise<TodoDTO> {
        const todo = new TodoModel({ content, completed: false });
        const document = await todo.save();
        const dto = new TodoDTO(document);
        return dto;
    }

    public async completedTodo(id: string, completed: boolean): Promise<TodoDTO | null> {
        const options: QueryFindOneAndUpdateOptions = {
            new: true,
            runValidators: true
        };
        const todo = await TodoModel.findByIdAndUpdate(id, { completed }, options);
        const dto =  todo ? new TodoDTO(todo) : null;
        return dto;
    }

    public async removeTodo(id: string): Promise<TodoDTO | null> {
        const todo = await TodoModel.findByIdAndRemove(id);
        const dto = todo ? new TodoDTO(todo) : null;
        return dto;
    }

}