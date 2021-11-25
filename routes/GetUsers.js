var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase')

/* Get all users */
router.get('/', async (req, res) => {
    let result = 'fail'
    let users = []

    const db = new DataBase()
    let { uid, name, keyword } = req.query

    let dbRes = undefined

    if (!uid && !name && !keyword)
        dbRes = await db.find('users', {})
    else if (keyword)
        dbRes = await db.find('users', {
            $or: [
                { uid: { $regex: `.*${keyword}.*` } },
                { name: { $regex: `.*${keyword}.*` } },
            ]
        })
    else
        dbRes = await db.find('users', {
            $or: [
                { uid: { $regex: `.*${uid}.*` } },
                { name: { $regex: `.*${name}.*` } },
            ]
        })

    if (dbRes.length > 0)
        result = 'ok'

    res.send(new ResponseData({
        users: dbRes
    }, result))
})

module.exports = router;
