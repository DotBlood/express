import { log } from "./app/core/Logger/Logger";
import express from "express";
import { InitStartUp } from './startUp';
import cookieParser from "cookie-parser";
import { AuthR } from './app/router/auth'
import { ChanelR } from './app/router/chanel'
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
        app.use('/auth/', AuthR);
        app.use(ChanelR)

        

        app.listen(80, () => {
            log.info('Server has start')
        });
    }
}


main()