var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase')
const SHAjs = require('sha.js')

/* Create group */
router.get('/', async (req, res) => {
    const db = new DataBase()
    let {groupName, creator, ...members} = req.query
    members = Object.values(members)
    let result = 'fail'
    let groupID = ''

    // find first
    let membersQuery = []
    for (m of members)
        membersQuery.push({uid: m})
    if ((await db.find('users', {
        $or: [
            {uid: creator},
            ...membersQuery
        ]
    })).length === members.length + 1) {
        // start to create group
        groupID = SHAjs('sha256').update(Date.now().toString()).digest('hex').substring(0, 4)
        // check group ID
        if ((await db.find('groups', {
            groupName,
            creator
        }, {
            projection: {groupID: 1}
        })).length > 0) {
            result = 'one cannot own two groups with same name'
        } else if ((await db.find(('groups', {groupID}))).length > 0) {
            result = 'group id exists'
        } else {
            await db.insert('groups', [{
                groupID,
                groupName,
                creator,
                members: [creator, ...members],
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
        members,
    }, result))
})

module.exports = router;
