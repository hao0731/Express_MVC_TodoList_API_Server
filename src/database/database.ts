import mongoose from 'mongoose';
import { DATABASE_OPTIONS } from './database.option';

export class Database {

    public connect(): void {
        mongoose.connect(
            `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PWD }@expressmvctodolist-clus.jjknt.gcp.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`,
            DATABASE_OPTIONS
        )
        .then(() => console.log(`Database ${ process.env.DB_NAME } is connected.`))
        .catch(err => console.error(err));
    }

}