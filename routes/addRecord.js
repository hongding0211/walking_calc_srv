var express = require('express');
var router = express.Router();
const ResponseData = require('../module/responseData');
const DataBase = require('../module/dataBase')
const SHAjs = require('sha.js')

/* Add a record */
router.get('/', async (req, res) => {
    let { groupID, who, paid, type, typeText, ...forWhom } = req.query
    forWhom = Object.values(forWhom)

    const db = new DataBase()

    let result = 'fail'

    let time = Date.now()
    let recordID = ''

    let group = await db.find('groups', { groupID }, { projection: { records: 0 } })

    if (group.length === 0) {
        result = 'group not exists'
    } else if (forWhom.length == 0) {
        result = 'who you are paying for?'
    } else if (!forWhom.every(member => group[0].members.includes(member))) {
        result = 'some of the members are not in the group'
    } else if (forWhom.length == 1 && forWhom[0] === who) {
        result = 'you cannot pay to yourself'
    } else if (!group[0].members.find(member => member === who)) {
        result = 'you are not even in the group'
    } else {

        // add record
        recordID = getTimeStr() + SHAjs('sha256').update(groupID + time).digest('hex').substring(0, 16)
        await db.updateOne('groups', { groupID }, {
            $push: {
                records: {
                    time,
                    recordID,
                    who,
                    paid,
                    type,
                    typeText,
                    forWhom
                }
            }
        })

        result = 'ok'
    }
    res.send(new ResponseData({
        time,
        recordID,
        who,
        paid,
        type,
        typeText,
        forWhom
    }, result))
})

const getTimeStr = function () {
    const d = new Date(Date.now())
    return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
}

module.exports = router;
