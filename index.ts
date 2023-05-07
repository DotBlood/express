import express from "express";
import { InitStartUp } from './startUp';
const app = express()


const pool = new InitStartUp().GetInstance.getPool()



pool
    .connect()
    .then(async (con) => {
        // add sql 
        try {
            await con.query(require('./sql.sql'))
            await con.release()
        }
        catch (err) {
            console.error(err)
        }
    })