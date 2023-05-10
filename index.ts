import express from "express";
import { InitStartUp } from './startUp';
import Routers from './app/router/auth'
import cookieParser from "cookie-parser";
import { log } from "./app/core/Logger/Logger";
const app = express()

const startuper = new InitStartUp();


function main() {
    try {
        startuper.DataBaseStartUP();
    }
    catch (err) {
        log.warn(err)
    }
    finally {
        app.use(express.static(__dirname + '/public'));
        app.set('view engine', 'ejs');
        app.use(cookieParser())
        app.use(express.urlencoded({ extended: false }))


        app.use('/auth/', Routers);

        app.listen('3000', () => {
            log.info('server has start on http://localhost:3000/')
        });
    }
}


main()