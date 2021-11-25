var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase');
const { dbName } = require('../module/DataBase');

/* Dismiss a group  */
router.get('/', async (req, res) => {
    const { uid, groupID } = req.query

    const db = new DataBase()

    let result = 'fail'

    if ((await db.find('groups', { groupID }, { projection: { records: 0 } })).length === 0) {
        result = 'group not exists'
    } else if ((await db.find('groups', { groupID, creator: uid }, { projection: { records: 0 } })).length === 0) {
        result = 'only creator can dissmiss the group'
    } else {

        // dismiss
        db.delete('groups', {
            groupID,
            creator: uid
        })
        result = 'ok'
    }

    res.send(new ResponseData({
        uid,
        groupID
    }, result))
})

module.exports = router;
