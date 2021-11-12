var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase')
const SHAjs = require('sha.js')

/* Create group */
router.get('/', async (req, res) => {
    const db = new DataBase()
    const { groupName, creator } = req.query
    let result = 'fail'
    let groupID = ''
    let groupCode = ''

    // find first
    if ((await db.find('users', { uid: creator })).length > 0) {
        // start to create group
        groupID = SHAjs('sha256').update(Date.now().toString()).digest('hex')
        groupCode = groupID.substring(0, 4)
        // check group ID
        if ((await db.find('groups', {
            groupName,
            creator
        }, {
            projection: { groupID: 1 } 
        })).length > 0) {
            result = 'one cannot own two groups with same name'
        } else {
            await db.insert('groups', [{
                groupID,
                groupCode,
                groupName,
                creator,
                members: [creator],
                records: []
            }])
            result = 'ok'
        }
    } else {
        result = 'user not exists'
    }

    res.send(new ResponseData({
        groupID,
        groupName,
        creator,
        groupCode,
    }, result))
})

module.exports = router;
