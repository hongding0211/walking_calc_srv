const MongoClient = require('mongodb').MongoClient

class DataBase {
    static connectionStr = 'mongodb://root:keith205@mongo:27017'
    static dbName = 'walking_calc'

    constructor() {
        this.client = new MongoClient(DataBase.connectionStr)
    }

    async find(collection, query = {}, options = {}) {
        let res = []
        try {
            await this.client.connect()

            const database = this.client.db(DataBase.dbName)
            const c = database.collection(collection)

            const cursor = c.find(query, options)
            res = await cursor.toArray()
        } finally {
            await this.client.close()
            return res
        }
    }

    async insert(collection, docs, options = {}) {
        let res = null

        try {
            await this.client.connect()

            const database = this.client.db(DataBase.dbName)
            const c = database.collection(collection)

            res = await c.insertMany(docs, options)
        } finally {
            await this.client.close()
            return res
        }
    }

    async updateOne(collection, filter, updateDoc, options = {}) {
        let res = null

        try {
            await this.client.connect()

            const database = this.client.db(DataBase.dbName)
            const c = database.collection(collection)

            res = await c.updateOne(filter, updateDoc, options)
        } finally {
            await this.client.close()
            return res
        }
    }

    async delete(collection, query) {
        let res = null

        try {
            await this.client.connect()

            const database = this.client.db(DataBase.dbName)
            const c = database.collection(collection)

            res = await c.deleteMany(query)
        } finally {
            await this.client.close()
            return res
        }
    }
}

module.exports = DataBase
