
import { InitStartUp } from "../../../startUp";
import { request, response, NextFunction } from "express";

type req = typeof request
type res = typeof response


export class authorizationMW {

    public async volidateSession(req: req, res: res, next: NextFunction) {
        if (req.cookies.session) {
            const session = req.cookies.session
            const db = new InitStartUp();
            let result = await db.GetUser.findSession(session);
            if (result.rows.length > 0) {
                return next()
            }
            res.clearCookie('session', { httpOnly: true })
            return res.redirect('/auth/login')
        }
        return res.redirect('/auth/login')
    }



    public async stopLoginRegister(req: req, res: res, next: NextFunction) {
        if (req.cookies['session']) {
            const session = req.cookies['session']

            const db = new InitStartUp();
            let result = await db.GetUser.findSession(session);
            if (result.rows.length > 0) {
                return res.redirect('/')
            }
            res.clearCookie('session', { httpOnly: true })
            return next()
        }
        return next()
    }

}