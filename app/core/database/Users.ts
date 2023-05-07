import { Pool } from "pg";
import { Database } from "./connect";

export class Users {
    private static instance: Users;
    private database: Database;
    private pool: Pool;

    constructor(database: Database) {
        this.pool = database.getPool()
        this.database = database;
    }

    public static getInstance(database: Database): Users {
        if (!Users.instance) {
            Users.instance = new Users(database);
        }
        return Users.instance;
    }
}