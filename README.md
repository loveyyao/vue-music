# vue-music

## Build Setup

``` bash
# install
git clone https://github.com/loveyyao/vue-music.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
```
# nw配置
{
  "name": "vue-music",
  "appName": "应用的中文别名",
  "version": "0.1.1",
  "description": "A seed project with Vue.js and Nw.js",
  "author": "anchengjian <anchengjian@gmail.com>",
  "main": "./index.html",
  "manifestUrl": "http://localhost:8080/releases/upgrade.json",
  "window": {
    "title": "vue-music",
    "toolbar": true,
    "width": 1004,
    "height": 670,
    "min_width": 1004,
    "min_height": 670,
    "max_width": 1004,
    "max_height": 670,
    "resizable": true,
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

