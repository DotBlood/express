// Подключение к бд

import { Database } from "./app/core/database/connect";
import { Tags } from "./app/core/database/Tags";
import { Users } from "./app/core/database/Users";
import { readFile } from "fs/promises";
import { join } from "path";


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
                // add sql 
                try {
                    await con.query(sql)
                    await con.release()
                    return true
                }
                catch (err) {
                    console.error(err)
                    return false
                }
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