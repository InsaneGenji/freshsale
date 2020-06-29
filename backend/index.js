const { database } = require('./connect');
const { register, searchData, changeCart } = require('./methods');
const express = require('express');
const app = express();
const port = 339;

// 注册
// 检查信息是否已被注册
const checkUser = async (user, data) => {
    const registry = await searchData('registry');
    return registry.some(value => {
        return value[data] === user[data];
    })
}
app.post(`/${database}/registry`, async (req, res) => {
    req.on('data', async data => {
        const user = JSON.parse(data);
        const usernameFlag = await checkUser(user, 'username');
        const emailFlag = await checkUser(user, 'email');
        const mobileFlag = await checkUser(user, 'mobile');
        if (usernameFlag || emailFlag || mobileFlag) {
            res.send(true);
        } else {
            res.send(false)
        }
    })
});
// 注册
app.post(`/${database}/register`, async (req, res) => {
    req.on('data', async data => {
        const user = JSON.parse(data);
        register(user);
        res.send('注册成功')
    })
})

// 登录
app.post(`/${database}/login`, async (req, res) => [
    req.on('data', async data => {
        const registry = await searchData('registry');
        const user = JSON.parse(data);
        let flag = false;
        for (let item of registry) {
            if ((user.account === item.username || user.account === item.email || user.account === item.mobile) && user.password === item.password) {
                res.send(item.username);
                flag = true;
                break;
            }
        }
        if (!flag) {
            res.send(false);
        }
    })
])

// 商品列表
app.get(`/${database}/goods`, async (req, res) => res.send(await searchData('goods')));

// 购物车
app.post(`/${database}/cart`, async (req, res) => {
    req.on('data', async data => {
        const user = JSON.parse(data);
        const userList = await searchData('registry');
        for (let item of userList) {
            if (item.username === user.username) {
                res.send(item.cart);
                break;
            }
        }
    })
})

// 加入购物车
app.post(`/${database}/addToCart`, async (req, res) => {
    req.on('data', async data => {
        const user = JSON.parse(data);
        const userList = await searchData('registry');
        let hasGoods = false;
        for (let item of userList) {
            if (user.username === item.username) {
                for (let goods of item.cart) {
                    if (user.cart._id == goods._id) {
                        goods.num += user.cart.num;
                        hasGoods = true;
                        break;
                    }
                }
                if (!hasGoods) {
                    item.cart.push(user.cart);
                }
                changeCart(item);
                res.send(true);
                break;
            }
        }
    })
})

// 更改购物车
app.post(`/${database}/changeCart`, async (req, res) => {
    req.on('data', async data => {
        const user = JSON.parse(data);
        const userList = await searchData('registry');
        for (let item of userList) {
            if (user.username === item.username) {
                changeCart(user);
                res.send(true);
                break;
            }
        }
    })
})


// 暴露端口号
app.listen(port, err => {
    if (err) {
        return console.log(err);
    }
});
console.log(`点击进入二次元 => http://localhost:${port} `);