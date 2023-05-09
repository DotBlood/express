import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { InitStartUp } from "../../../startUp";
import { UUID, randomUUID } from "crypto";


export = new class Autorization_sys {
    getDatabase: InitStartUp;
    salt: string;

    constructor() {
        this.getDatabase = new InitStartUp()
        this.salt = genSaltSync()
    }

    public async login(username: string, password: string) {
        const pool = this.getDatabase.GetUser;
        let userDb = await pool.findUserByUsername(username);
        if (userDb.rows.length > 0) {
            const passinDb = userDb.rows[0].password
            let result = compareSync(password, passinDb)
            if (result) {
                let uuid = this.CreateSession(userDb.rows[0].user_id)
                return { error: false, cookie: uuid }
            }
        }
        return { error: true, cookie: undefined }
    }

    public async Register(username: string, email: string, password: string) {
        const pool = this.getDatabase.GetUser
        let data = await pool.findUserRegister(username, email)
        if (data.rows.length > 0) return { error: true, cookie: null };
        let HashPassword = hashSync(password, this.salt)
        await pool.addNewUserRegister(username, email, HashPassword);
        let userdata = await pool.findUserByUsername(username)
        let uuid = await this.CreateSession(userdata.rows[0].id)
        return { error: false, cookie: uuid };
    }

    public async CreateSession(user_id: string) {
        const pool = this.getDatabase.GetUser
        let UUID = randomUUID()
        await pool.addSessionToUser(user_id, UUID)
        return UUID
    }

}
