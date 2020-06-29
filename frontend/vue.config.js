const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
    devServer: {
        // 自动打开浏览器
        open: true,
        // 反向代理
        proxy: {
            '/freshsale': {
                target: 'http://localhost:339',
                ws: true,
                changeOrigin: true
            }
        }
    },
    // 修改文件引入自定义路径(配置路径别名)
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
    }
}