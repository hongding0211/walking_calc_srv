var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase');

/* Delete Records */
router.get('/', async (req, res) => {
    const db = new DataBase()

    let { groupID, recordID, who, paid, type, ...forWhom } = req.query
    forWhom = Object.values(forWhom)

    let result = 'fail'

    let time = Date.now()

    let dbResult = await db.updateOne('groups', {
        groupID,
        'records.recordID': recordID,
        'records.who': who
    }, {
        $set: {
            "records.$.paid": paid,
            "records.$.type": type,
            "records.$.forWhom": forWhom,
            'records.$.latestModified': time
        }
    })

    if (dbResult.acknowledged) {
        if (dbResult.modifiedCount > 0)
            result = 'ok'
        else
            result = 'record not exists'
    }
    res.send(new ResponseData({
        groupID,
        recordID,
        who,
        paid,
        type,
        forWhom,
        latestModified: time
    }, result))
})

module.exports = router;
