export class ResponseDTOBase {

    public readonly _id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    constructor(dto: ResponseDTOBase) {
        this._id = dto._id;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }

}