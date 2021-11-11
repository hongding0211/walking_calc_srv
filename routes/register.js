var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const formidable = require('formidable')
const DataBase = require('../module/db')
const fs = require('fs')

/* Register */
router.post('/', (req, res) => {
    const form = new formidable.IncomingForm()
    result = 'fail'
    form.parse(req, async (err, fields, files) => {
        imgSize = 0
        if (!err) {
            const db = new DataBase()
            const img = files.avatar
            imgSize = img.size
            // file size limit
            if (imgSize > 4096 * 1024) {
                result = 'image size lager than 4mb'
                return
            }
            const imgBase64 = imgFile2Base64(img)
            // find first, if not exists, then insert
            if ((await db.find('users', { uid: fields.uid })).length == 0) {
                await db.insert('users', [{
                    ...fields,
                    img: imgBase64
                }])
                result = 'ok'
            } else {
                result = 'already exists'
            }
        }
        res.send(new ResponseData({
            ...fields,
            img_size: `${imgSize / (1024)}kb`
        }, result))
    })
})

const imgFile2Base64 = function (f) {
    const bitmap = fs.readFileSync(f.filepath)
    return Buffer.from(bitmap, 'base64')
}

module.exports = router;
