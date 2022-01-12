var express = require('express');
var router = express.Router();
const ResponseData = require('../module/responseData');
const DataBase = require('../module/dataBase')

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
                { name: { $regex: new RegExp(`.*${keyword}.*`, 'i') } },
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
