// Подключение к бд

import { Database } from "./app/core/database/connect";
import { Tags } from "./app/core/database/Tags";
import { Users } from "./app/core/database/Users";


let Config = {
    host: "127.0.0.1",
    port: 5432,
    user: "test_user_postgres",
    password: "test_password_postgres",
    database: "test_jest",
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