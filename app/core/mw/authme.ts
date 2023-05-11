
import { InitStartUp } from "../../../startUp";
import { Response, Request, NextFunction } from "express";



export class authorizationMW {

    public async volidateSession(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.session) {
            const session = req.cookies.session
            const db = new InitStartUp();
            let result = await db.GetUser.findSession(session);
            if (result.rows.length > 0) {
                req.body.isAuth = true
                return next()
            }
            req.body.isAuth = false
            res.clearCookie('session', { httpOnly: true })
            return res.redirect('/auth/login')
        }
        req.body.isAuth = false
        return res.redirect('/auth/login')
    }



    public async stopLoginRegister(req: Request, res: Response, next: NextFunction) {
        if (req.cookies['session']) {
            const session = req.cookies['session']

            const db = new InitStartUp();
            let result = await db.GetUser.findSession(session);
            if (result.rows.length > 0) {
                req.body.isAuth = true
                return res.redirect('/')
            }
            res.clearCookie('session', { httpOnly: true })
            req.body.isAuth = false
            return next()
        }
        req.body.isAuth = false
        return next()
    }

}