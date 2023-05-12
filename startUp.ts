import { Database } from "./app/core/database/connect";
import { Tags } from "./app/core/database/Tags";
import { Users } from "./app/core/database/Users";
import { readFile } from "fs/promises";
import { join } from "path";
import { log } from "./app/core/Logger/Logger";


let Config = {
    host: "127.0.0.1",
    port: 5432,
    user: "app_user",
    password: "app_pass",
    database: "app_database",
}


export class InitStartUp {
    private database: Database;
    private dbTag: Tags;
    private dbUser: Users;

    constructor() {
        this.database = Database.getInstance(Config)
        this.dbTag = new Tags(this.database);
        this.dbUser = new Users(this.database);
    }

    public async DataBaseStartUP() {
        const pool = this.database.getPool
        const sql = await readFile(join(__dirname, '.sql'), { encoding: 'utf-8' });
        pool
            .connect()
            .then(async (con) => {
                await con.query(sql)
                con.release()
                log.info('Database is ready')
                return true
            })
            .catch(err => {
                log.error(err, 'The database does not connect. Try connecting in 5 seconds')
                setTimeout(async () => {
                    await this.DataBaseStartUP()
                }, 5 * 1000)
            })
    }

    get GetUser() {
        return this.dbUser
    }

    get GetTag() {
        return this.dbTag
    }

    get GetInstance() {
        return this.database
    }
}