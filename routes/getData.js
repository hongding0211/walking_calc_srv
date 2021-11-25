var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const DataBase = require('../module/DataBase')

/* Get data */
router.get('/', async (req, res) => {
    const { uid, groupID } = req.query
    const db = new DataBase()

    // find records whose creator
    let groups = await db.find('groups', {
        $or: [
            { creator: uid },
            { members: { $elemMatch: { $eq: uid } } },
            { groupID }
        ]
    })

    res.send(new ResponseData({
        groups
    }, 'ok'))
})

module.exports = router;
