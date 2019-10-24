// sessionStorage
function session (key, value) {
  if (value === void (0)) {
    var lsVal = sessionStorage.getItem(key)
    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
      return JSON.parse(lsVal.split('autostringify-')[1])
    } else {
      return lsVal
    }
  } else {
    if (typeof (value) === 'object' || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value)
    }
    return sessionStorage.setItem(key, value)
  }
}

// 生成随机数
function getUUID (len) {
  len = len || 6
  len = parseInt(len, 10)
  len = isNaN(len) ? 6 : len
  var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
  var seedLen = seed.length - 1
  var uuid = ''
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)]
  }
  return uuid
}

function getQueryString (name) {
  let value_ = null
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  if (window.location.search.split('?').length > 1) {
    let r = window.location.search.split('?')[1].match(reg)
    if (r != null) {
      value_ = unescape(r[2])
    }
  }
  if (!value_) {
    if (window.location.hash.split('?').length > 1) {
      let r = window.location.hash.split('?')[1].match(reg)
      if (r != null) {
        value_ = unescape(r[2])
      }
    }
  }
  return value_
}

// ***********************************
// name：设置cookies字段
// purpose: 添加或者修改cookies某字段
function setCookies (cName, value) {
  let today = new Date().getTime()
  let endDay = new Date(today + 8 * 60 * 60 * 1000)
  let cookieStr = cName + '=' + value + ';' + endDay + ';path=/'
  document.cookie = cookieStr
}

// name：获取cookies字段
// purpose: 根据字段名获取cookies某字段
function getCookies (cName) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) {
        cEnd = document.cookie.length
      }
      return decodeURI(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

function eldateFormat (row, column, cellValue, index) {
  const daterc = row.creatDate.toString()
  if (daterc != null) {
    let dateMat = new Date(parseInt(daterc.replace('/Date(', '').replace(')/', ''), 10))
    let year = dateMat.getFullYear()
    let month = dateMat.getMonth() + 1
    month = (month < 10 ? '0' + month : month + '')
    let day = dateMat.getDate()
    day = (day < 10 ? '0' + day : day + '')
    let hh = dateMat.getHours()
    hh = (hh < 10 ? '0' + hh : hh + '')
    let mm = dateMat.getMinutes()
    mm = (mm < 10 ? '0' + mm : mm + '')
    let ss = dateMat.getSeconds()
    ss = (ss < 10 ? '0' + ss : ss + '')
    const timeFormat = year + '.' + month + '.' + day + ' ' + hh + ':' + mm + ':' + ss
    return timeFormat
  }
}

function fileSizeFormat (fileByte) {
  var fileSizeByte = fileByte
  var fileSizeMsg = ''
  if (fileSizeByte < 1048576) {
    fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
  } else if (fileSizeByte === 1048576) {
    fileSizeMsg = '1MB'
  } else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) {
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
  } else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) {
    fileSizeMsg = '1GB'
  } else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) {
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  } else {
    fileSizeMsg = '文件超过1TB'
  }
  return fileSizeMsg
}

function dateFormat (stamp_, dateSplit, timeSplit) {
  dateSplit = dateSplit || '.'
  timeSplit = timeSplit || ':'
  if (stamp_ != null) {
    let dateMat = new Date(parseInt(stamp_))
    let year = dateMat.getFullYear()
    let month = dateMat.getMonth() + 1
    month = (month < 10 ? '0' + month : month + '')
    let day = dateMat.getDate()
    day = (day < 10 ? '0' + day : day + '')
    let hh = dateMat.getHours()
    hh = (hh < 10 ? '0' + hh : hh + '')
    let mm = dateMat.getMinutes()
    mm = (mm < 10 ? '0' + mm : mm + '')
    let ss = dateMat.getSeconds()
    ss = (ss < 10 ? '0' + ss : ss + '')
    return year + dateSplit + month + dateSplit + day + ' ' + hh + timeSplit + mm + timeSplit + ss
  }
}
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
const vInfo = new Date().format('yyyyMMddhhmm')

export {session, vInfo, getUUID, setCookies, getCookies, getQueryString, eldateFormat, dateFormat, fileSizeFormat}
