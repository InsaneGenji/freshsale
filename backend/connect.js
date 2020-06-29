const { MongoClient } = require('mongodb');
const DB_URL = 'mongodb://localhost:27017';
const database = 'freshsale';

// 建立连接
connectDataBase = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                reject(err);
            };
            // 数据库名
            resolve(client.db(database));
        });
    });
};

module.exports = { database, connectDataBase };