class ResponseData {
    static responseCode = {
        'ok': 200,
        'fail': 4000,
        'already exists': 4001,
        'user not exists': 4002
    }

    constructor(data, result = 'fail') {
        this.code = ResponseData.responseCode[result]
        this.result = result
        this.data = data
    }
}

module.exports = ResponseData
