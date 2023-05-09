import { Pool } from "pg";
import { Database } from "./connect";

export class Users {
    private static instance: Users;
    private database: Database;
    private pool: Pool;

    constructor(database: Database) {
        this.pool = database.getPool
        this.database = database;
    }

    public static getInstance(database: Database): Users {
        if (!Users.instance) {
            Users.instance = new Users(database);
        }
        return Users.instance;
    }

    public async findUserByUsername(username: string) {
        const connect = this.pool.connect()
        let result = await this.pool.query('SELECT * FROM users WHERE username = $1', [username])
            ; (await connect).release()
        return result;
    }

    public async findUserRegister(username: string, email: string) {
        const connect = this.pool.connect()
        let result = await this.pool.query('SELECT user_id, username, email FROM users WHERE username = $1 OR email = $2', [username, email])
            ; (await connect).release()
        return result;
    }

    public async addNewUserRegister(username: string, email: string, HashPassword: string) {
        const connect = this.pool.connect()
        let result = await this.pool.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [username, email, HashPassword])
            ; (await connect).release()
        return result;
    }

    public async addSessionToUser(user_id: string, uuid: string) {
        const connect = this.pool.connect()
        let result = await this.pool.query('INSERT INTO session(user_id, session) VALUES($1, $2)', [user_id, uuid])
            ; (await connect).release()
        return result;
    }

    public async findSession(sessionKey: string) {
        const connect = this.pool.connect()
        let result = await this.pool.query('SELECT * FROM session WHERE session = $1', [sessionKey])
            ; (await connect).release()
        return result;
    }


}