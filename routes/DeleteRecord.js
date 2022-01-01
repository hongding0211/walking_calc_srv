var express = require('express');
var router = express.Router();
const ResponseData = require('../module/responseData');
const DataBase = require('../module/dataBase');
const { dbName } = require('../module/dataBase');

/* Delete Records */
router.get('/', async (req, res) => {
    const db = new DataBase()
    const { groupID, recordID } = req.query
    let result = 'fail'
    let dbResult = await db.updateOne('groups', {
        groupID
    }, {
        $pull: {
            records: {
                recordID
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
        recordID
    }, result))
})

module.exports = router;
