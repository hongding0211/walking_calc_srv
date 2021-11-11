var express = require('express');
var router = express.Router();
const ResponseData = require('./ResponseData');
const DataBase = require('../db/db')

/* Get user avatar */
router.get('/', async (req, res) => {
    const { uid } = req.query
    const db = new DataBase()
    const dbRes = await db.find('users', { uid }, { projections: { img: 1 } })
    const img = dbRes.length > 0 ? dbRes[0].img : ''
    res.send(img)
})

module.exports = router;
