import { Pool, PoolConfig } from "pg";


export class Database {
    private static instance: Database;
    private pool: Pool;


    private constructor(config: PoolConfig) {
        this.pool = new Pool(config);
    }

    public static getInstance(config: PoolConfig): Database {
        if (!Database.instance) {
            Database.instance = new Database(config);
        }
        return (Database.instance);
    }

    public getPool(): Pool {
        return this.pool;
    }
}
