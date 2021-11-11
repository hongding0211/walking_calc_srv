var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/db')

/* Get user avatar */
router.get('/', async (req, res) => {
    const { uid } = req.query
    const db = new DataBase()
    const dbRes = await db.find('users', { uid }, { projections: { img: 1 } })
    const img = dbRes.length > 0 ? dbRes[0].img : ''
    const result = dbRes.length > 0 ? 'ok' : 'user not exists'
    res.send(new ResponseData({
        img
    }, result))
})

module.exports = router;
