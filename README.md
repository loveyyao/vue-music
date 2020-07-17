# vue-music
下载nw压缩包，桌面应用，体验更加+++
## Build Setup

``` bash
# install
git clone https://github.com/loveyyao/vue-music.git

# install dependencies
npm install
# node-sass可能下载报错，解决方法如下

npm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

npm install node-sass

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
``` bash
# 网易云API安装
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install
# 运行
$ node app.js
```
``` bash
# 下载nw.zip(nw.js用npm实在下不下来，有稳定的翻墙应该能，只有在官网下载压缩包使用)
https://nwjs.org.cn/
解压到本地，然后在根目录下新建package.json，点击nw.exe
# package.json
{
  "name": "vue-music",
  "appName": "应用的中文别名",
  "version": "0.1.1",
  "description": "A seed project with Vue.js and Nw.js",
  "author": "anchengjian <anchengjian@gmail.com>",
  "main": "http://localhost:8080/#/",
  "manifestUrl": "http://localhost:8080/releases/upgrade.json",
  "window": {
    "title": "vue-music",
    "toolbar": true,
    "width": 1004,
    "height": 670,
    "kiosk": false,
    "frame": false,
    "transparent": true,
    "icon": "/static/logo.png",
    "show_in_taskbar": true
  },
  "nodejs": true,
  "js-flags": "--harmony",
  "node-remote": "<all_urls>"
}
```
</p>

