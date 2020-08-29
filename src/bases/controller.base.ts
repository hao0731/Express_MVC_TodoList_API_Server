import { HttpStatus } from '../types/response.type';
import { ResponseObject } from '../common/response/response.object';

export abstract class ControllerBase {

    public formatResponse(data: any, status = HttpStatus.INTERNAL_ERROR): ResponseObject {
        const options: any = { status };

        status >= 400
        ? options.message = data
        : options.data = data;

        const responseObject = new ResponseObject(options);

        return responseObject;
    }

}