var express = require('express');
var router = express.Router();
const ResponseData = require('../module/responseData');
const DataBase = require('../module/dataBase')
const log4js = require('log4js')

log4js.configure({
    appenders: {
        login: {
            type: "file",
            filename: "login.log",
            layout: {
                type: 'pattern',
                pattern: '[%x{myTime}] [%p] %c - %m',                // using tokens
                tokens: {
                    myTime: function (logEvent) {
                        return new Date().toLocaleString('zh-CN')
                    }
                }
            }
        }
    },
    categories: { default: { appenders: ["login"], level: "info" } }
})

function log(text) {
    const logger = log4js.getLogger('login')
    logger.info(text)
}

/* Login */
router.get('/', async (req, res) => {
    const { uid } = req.query

    // log
    const userAgent = req.headers['user-agent']
    log(`${uid}, ${userAgent}`)

    const db = new DataBase()
    const dbRes = await db.find('users', { uid })
    const result = dbRes.length > 0 ? 'ok' : 'user not exists'
    const name = dbRes.length > 0 ? dbRes[0].name : 'N/A'
    res.send(new ResponseData({
        uid,
        name
    }, result))
})

module.exports = router;
