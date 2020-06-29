const { connectDataBase } = require('./connect');

// 查
searchData = async (collection) => {
    const db = await connectDataBase();
    return new Promise((resolve, reject) => {
        db.collection(collection).find().toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// 注册
register = async user => {
    const db = await connectDataBase();
    return new Promise((resolve, reject) => {
        db.collection('registry').insertOne(user, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

// 更改购物车
changeCart = async user => {
    const db = await connectDataBase();
    return new Promise((resolve, reject) => {
        db.collection("registry").updateOne({ username: user.username },
            {
                $set: {
                    cart: user.cart
                }
            }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
    });
};

module.exports = { register, searchData, changeCart };