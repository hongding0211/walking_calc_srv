class ResponseData {
    static responseCode = {
        'ok': 200,
        'fail': 400
    }

    constructor(data, result = 'fail') {
        this.code = ResponseData.responseCode[result]
        this.result = result
        this.data = data
    }
}

module.exports = ResponseData
