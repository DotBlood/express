import { Pool, PoolClient, QueryResult } from "pg";
import { Database } from "./connect";
import { ITag, ITagRespone, IUpdateTag, TQuery } from "../../../types/Database";

export class Tags {
    private static instance: Tags;
    private database: Database;
    private pool: Pool;
    static GetTagByID: any;

    constructor(database: Database) {
        this.pool = database.getPool
        this.database = database;
    }

    public static getInstance(database: Database): Tags {
        if (!Tags.instance) {
            Tags.instance = new Tags(database);
        }
        return Tags.instance;
    }

    private async QNotResData(query: string, value: string[] | number[] | (string | number)[]) {
        try {
            const client: PoolClient = await this.pool.connect()
            await this.pool.query(query, [...value]);
            client.release()
        } catch (err) {
            throw err;
        }
    }


    public async GetTagByID(ID: number): ITagRespone {
        const query: TQuery = "SELECT name data FROM tags WHERE ID = $1"
        try {
            const client = await this.pool.connect()
            const result: QueryResult = await this.pool.query(query, [ID])
            client.release()
            if (result.rows.length === 0) throw new Error("Error not responses");
            const Tag: ITag[] = result.rows
            return Tag;
        } catch (err) {
            throw err
        }
    }



    public async GetAllTag(): ITagRespone {
        const query: TQuery = "SELECT * FROM tags"

        try {
            const client = await this.pool.connect()
            const result: QueryResult = await this.pool.query(query)
            client.release()
            if (result.rows.length === 0) throw new Error("Error not responses");
            const Tag: ITag[] = result.rows;
            return Tag;
        } catch (err) {
            throw err;
        }

    }

    public async SetNewTag(name: string, data: string): Promise<boolean | Error> {
        const query: TQuery = "INSERT INTO tags (name, data) VALUES ($1, $2)";

        try {
            await this.QNotResData(query, [name, data]);
            return true;
        } catch (err) {
            throw err;
        }

    }

    public async UpdateTag(ID: number, args: IUpdateTag): Promise<boolean | Error> {
        try {
            const tag: ITag[] | Error = await this.GetTagByID(ID);
            if (tag instanceof Error) throw new Error('Error when updating the tag!');

            if (args.name && args.data) {
                const query: TQuery = "UPDATE tags SET name = $1, data = $2 WHERE id = $3"
                await this.QNotResData(query, [args.name, args.data, ID]);
                return true;
            }
            else if (args.name && !args.data) {
                const query: TQuery = "UPDATE tags SET name = $1 WHERE id = $2"
                await this.QNotResData(query, [args.name, ID])
                return true;
            }
            else if (!args.name && args.data) {
                const query: TQuery = "UPDATE tags SET data = $1 WHERE id = $2"
                await this.QNotResData(query, [args.data, ID]);
                return true;
            }
            else {
                throw new Error('Error when updating the tag ``not new Data``!');
            }
        }
        catch (err) {
            throw err;
        }
    }

    public async RemoveTag(ID: number): Promise<boolean | Error> {
        const query: TQuery = "DELETE FROM tags WHERE id = $1";
        try {
            await this.QNotResData(query, [ID]);
            return true;
        } catch (err) {
            throw err;
        }
    }
}