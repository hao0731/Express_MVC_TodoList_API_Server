export class JWTPayloadDTO {

    public readonly _id: string;
    public readonly username: string;

    constructor(payload: JWTPayloadDTO) {
        this._id = payload._id;
        this.username = payload.username;
    }

}