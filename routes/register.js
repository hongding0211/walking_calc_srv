var express = require('express');
var router = express.Router();
const ResponseData = require('../module/ResponseData');
const formidable = require('formidable')
const DataBase = require('../module/DataBase')
const fs = require('fs')
const images = require('images')
/* Register */
router.post('/', async (req, res) => {
    const db = new DataBase()
    const form = new formidable.IncomingForm()
    let result = 'fail'
    let imgSize = 0
    let imgNewSize = 0

    form.parse(req, async (err, fields, files) => {
        if (!err) {
            // find first, if not exists, then insert
            if ((await db.find('users', { uid: fields.uid })).length == 0) {
                const img = files.avatar
                imgSize = (img.size / 1024).toFixed(2)
                // size limit
                if (imgSize > 1024) {
                    result = 'image size lager than 4mb'
                } else {
                    const imgBase64 = imgFile2Base64(img)
                    imgNewSize = (imgBase64.length / 1024).toFixed(2)
                    await db.insert('users', [{
                        ...fields,
                        img: imgBase64
                    }])
                    result = 'ok'
                }
            } else {
                result = 'already exists'
            }
        }
        await res.send(new ResponseData({
            ...fields,
            img_origin_size: `${imgSize}kb`,
            img_resized_size: `${imgNewSize}kb`
        }, result))
    })
})

const imgFile2Base64 = function (f) {
    const imgFile = fs.readFileSync(f.filepath)
    // resize
    const img = images(imgFile).size(120).encode('jpg', { operation: 50 })
    return Buffer.from(img, 'base64')
}

module.exports = router;
