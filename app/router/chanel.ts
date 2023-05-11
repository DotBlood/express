import { Router } from "express";
import { authorizationMW } from "../core/mw/authme";
const mw = new authorizationMW()

const ChanelR: Router = Router()

interface IresponseData {
    user_auth: boolean
    title: string
    header_error: string | undefined
}

// index
ChanelR.get('/', mw.volidateSession, (req, res) => {
    
    let responseData: IresponseData = { header_error: undefined, title: 'Главная', user_auth: req.body.isAuth }
    res.render('pages/main/index', responseData)
})


// Chenal
ChanelR.get('/mc/', mw.volidateSession)
ChanelR.get('/mc/:id', mw.volidateSession)


// Chenal Create Update Delite
ChanelR.post('/s/create', mw.volidateSession)
ChanelR.put('/s/:id', mw.volidateSession)
ChanelR.delete('/s/:id', mw.volidateSession)

// msg
ChanelR.post('/m/send', mw.volidateSession)
ChanelR.delete('/m/:id', mw.volidateSession)

export { ChanelR }
