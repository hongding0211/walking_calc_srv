var express = require('express');
var router = express.Router();
const ResponseData = require("./ResponseData");

/* Login */
router.get('/', (req, res) => {
    let q = req.query
    res.send(new ResponseData({
        uid: q.uid,
        result: false
    }, 'fail'))
})

module.exports = router;
