import { ResponseDTOBase } from '../bases/dto.base';
import { TodoDocument } from '../models/todo.model';

export class ResponseTodoDTO extends ResponseDTOBase {

    public readonly content!: string;
    public readonly completed!: boolean;

    constructor(doc: TodoDocument) {
        super(doc);
        this.content = doc.content;
        this.completed = doc.completed;
    }

}