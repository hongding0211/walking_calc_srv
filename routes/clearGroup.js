var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/dataBase')

/* Clear Group */
router.get('/', async (req, res) => {
    let result = 'fail'
    const { groupID } = req.query
    console.log(groupID)
    const db = new DataBase()
    // find group
    const group = await db.find('groups', {groupID}, {projection: {records: 0}})
    if (group.length === 0) {
        result = 'group not exists'
    } else {
        const dbResult = await db.updateOne('groups', { groupID }, {
            $pull: {
                records: {}
            }
        })
        if (dbResult.acknowledged) {
            result = 'ok'
        }
    }
    res.send(new ResponseData({
        groupID
    }, result))
})

module.exports = router;
