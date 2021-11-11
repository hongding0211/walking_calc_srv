var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/db')

/* Login */
router.get('/', async (req, res) => {
    const { uid } = req.query
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
