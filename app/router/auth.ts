import { Router } from "express";
import Autorization_sys from '../controller/auth/auth_sys'
import { authorizationMW } from "../core/mw/authme";
const mw = new authorizationMW()


const AuthR: Router = Router()

interface IresponseData {
    user_auth: boolean
    title: string
    header_error: string | undefined
}

interface IreqLoginData {
    username: string
    password: string
}

interface IreqRegisterData {
    username: string
    email: string
    password: string
}


AuthR.get('/', (req, res) => res.redirect(301, '/auth/login'))
AuthR.post('/', (req, res) => res.redirect(404, '/'))

AuthR.get('/login', mw.stopLoginRegister, (req, res) => {
    let responseData: IresponseData = { user_auth: req.body.isAuth, title: 'Авторизация', header_error: undefined };

    if (typeof req.query.error === "string") {
        responseData.header_error = decodeURIComponent(req.query.error);
    }

    res.render('pages/auth/login', responseData);
})

AuthR.post('/login', mw.stopLoginRegister, async (req, res) => {
    let reqestData: IreqLoginData = req.body
    const session = await Autorization_sys.login(reqestData.username, reqestData.password)

    if (session.error == true) {
        let errorMessage = 'auth_2';
        return res.redirect(302, '/auth/login?error=' + encodeURIComponent(errorMessage))
    }

    res.cookie('session', session.cookie, { httpOnly: true });
    return res.redirect('/channel/');
})


AuthR.get('/register', mw.stopLoginRegister, (req, res) => {
    let responseData: IresponseData = { user_auth: req.body.isAuth, title: 'Регистрация', header_error: undefined };
    if (typeof req.query.error === "string") {
        responseData.header_error = decodeURIComponent(req.query.error);
    }
    res.render('pages/auth/register', responseData);
});


AuthR.post('/register', mw.stopLoginRegister, async (req, res) => {

    let reqestData: IreqRegisterData = req.body

    let session = await Autorization_sys.Register(req.body.username, reqestData.email, reqestData.password)

    if (session.error == true) {
        let errorMessage = 'auth_1';
        return res.redirect(302, '/auth/register?error=' + encodeURIComponent(errorMessage))
    }

    res.cookie('session', session.cookie, { httpOnly: true });

    return res.redirect('/channel/');
})

AuthR.get('/logout', mw.volidateSession, async (req, res) => {
    await Autorization_sys.Logout(req.cookies['session'])
    return res.redirect('/')
})

export { AuthR };