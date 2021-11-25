var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase');
const { FindCursor } = require('mongodb');

/* Join in a group */
router.get('/', async (req, res) => {
    const { groupID, uid } = req.query
    const db = new DataBase()

    let result = ''
    let members = []

    let q = await db.find('groups', { groupID }, {
        projection: { records: 0 }
    })
    if (q.length == 0) {
        result = 'group not exists'
    } else {
        members = q[0].members
        if ((await db.find('users', { uid })).length === 0) {
            result = 'user not exists'
        } else {
            if (q[0].creator === uid) {
                result = 'one cannot join the group he created'
            } else if (members.find(x => x === uid)) {
                result = 'one already in the group'
            } else {
                // push uid to the array
                await db.updateOne('groups', {
                    groupID
                }, {
                    $addToSet: {
                        members: uid
                    }
                })
                members.push(uid)
                result = 'ok'
            }
        }
    }


    res.send(new ResponseData({
        groupID,
        uid,
        members
    }, result))
})

module.exports = router;
