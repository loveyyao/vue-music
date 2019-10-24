import {
  dateFormat,
  eldateFormat,
  fileSizeFormat,
  getCookies,
  getQueryString,
  getUUID,
  vInfo,
  session,
  setCookies
} from './utils'
export default {
  install: function (Vue, options) {
    Vue.prototype.session = session
    Vue.prototype.getUUID = getUUID
    Vue.prototype.vInfo = vInfo
    Vue.prototype.setCookies = setCookies
    Vue.prototype.getCookies = getCookies
    Vue.prototype.getQueryString = getQueryString
    Vue.prototype.eldateFormat = eldateFormat
    Vue.prototype.dateFormat = dateFormat
    Vue.prototype.fileSizeFormat = fileSizeFormat
  }
}
