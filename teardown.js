const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const DIR = path.join('.', 'jest_puppeteer_global_setup');
module.exports = async function () {
    // đóng trình duyệt sau khi kiểm tra xong
    await global.__BROWSER_GLOBAL__.close();

    // tự động xóa forder wsEndpoint sau khi kiểm thử xong
    rimraf.sync(DIR);
};