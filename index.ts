import express from "express";
import { InitStartUp } from './startUp';
import { error, log } from "console";
import Routers from './app/router/auth'
import cookieParser from "cookie-parser";
const app = express()

const startuper = new InitStartUp();


function main() {
    try {
        startuper.DataBaseStartUP();
    }
    catch (err) {
        error(err)
    }
    finally {
        app.use(express.static(__dirname + '/public'));
        app.set('view engine', 'ejs');
        app.use(cookieParser())
        app.use(express.urlencoded({ extended: false }))


        app.use('/auth/', Routers);

        app.listen('3000', () => {
            log('server has start on http://localhost:3000/')
        });
    }
}


main()