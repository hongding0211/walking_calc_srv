var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase');
const { dbName } = require('../module/DataBase');

/* Delete Records */
router.get('/', async (req, res) => {
    const db = new DataBase()
    const { groupID, uid, recordID } = req.query
    let result = 'fail'
    let dbResult = await db.updateOne('groups', {
        groupID
    }, {
        $pull: {
            records: {
                recordID,
                who: uid
            }
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
        uid,
        recordID
    }, result))
})

module.exports = router;
