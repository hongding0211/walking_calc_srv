class ResponseData {
    static responseCode = {
        'ok': 200,
        'fail': 4000,
        'already exists': 4001,
        'user not exists': 4002,
        'one cannot own two groups with same name': 4003,
        'group not exists': 4004,
        'one cannot join the group he created': 4005,
        'one already in the group': 4006,
        'some of the members are not in the group': 4007,
        'you cannot pay to yourself': 4008,
        'who you are paying for?': 4009,
        'only creator can dissmiss the group': 4010,
        'record not exists': 4011
    }

    constructor(data, result = 'fail') {
        this.code = ResponseData.responseCode[result]
        this.result = result
        this.data = data
    }
}

module.exports = ResponseData
