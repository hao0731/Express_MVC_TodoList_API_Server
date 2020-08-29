import { ControllerBase } from '../../../bases/controller.base';
import { ResponseObject } from '../../../common/response/response.object';
import { ResponseHandler } from '../../../common/response/response.decorator';
import { HttpStatus } from '../../../types/response.type';

export class TodoController extends ControllerBase {

    @ResponseHandler
    public async getTodos(): Promise<ResponseObject> {
        return this.formatResponse([], HttpStatus.OK);
    }

}