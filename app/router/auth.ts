import { Router } from "express";
import Autorization_sys from '../controller/auth/auth_sys'
import { authorizationMW } from "../core/mw/authme";


const Routers: Router = Router()

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


Routers.get('/login', new authorizationMW().stopLoginRegister, (req, res) => {

    let responseData: IresponseData = { user_auth: false, title: 'Авторизация', header_error: undefined };

    if (typeof req.query.error === "string") {
        responseData.header_error = decodeURIComponent(req.query.error);
    }

    res.render('pages/auth/login', responseData);
})

Routers.post('/login', new authorizationMW().stopLoginRegister, async (req, res) => {
    let reqestData: IreqLoginData = req.body
    const session = await Autorization_sys.login(reqestData.username, reqestData.password)

    if (session.error == true) {
        let errorMessage = 'auth_2';
        return res.redirect(302, '/auth/login?error=' + encodeURIComponent(errorMessage))
    }

    res.cookie('session', session.cookie, { httpOnly: true });
    res.redirect('/');

    return res.send('Cookie установлен');
})


Routers.get('/register', new authorizationMW().stopLoginRegister, (req, res) => {
    let responseData: IresponseData = { user_auth: false, title: 'Регистрация', header_error: undefined };
    if (typeof req.query.error === "string") {
        responseData.header_error = decodeURIComponent(req.query.error);
    }
    res.render('pages/auth/register', responseData);;
});


Routers.post('/register', new authorizationMW().stopLoginRegister, async (req, res) => {

    let reqestData: IreqRegisterData = req.body

    let session = await Autorization_sys.Register(reqestData.username, reqestData.email, reqestData.password)

    if (session.error == true) {
        let errorMessage = 'auth_1';
        return res.redirect(302, '/auth/register?error=' + encodeURIComponent(errorMessage))
    }

    res.cookie('session', session.cookie, { httpOnly: true });

    res.redirect('/');
    return res.send('Cookie установлен');
})

Routers.get('/logout', (req, res) => { })

export = Routers;