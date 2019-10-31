export const realFormatSecond = function (second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '00:00'
  }
}
export const FormattedNumber = function (num) {
  var numType = typeof num
  if (numType === 'number' || numType === 'string') {
    if (num < 1000) {
      return num
    } else if (num < 10000) {
      return parseInt(num / 1000) + 'k+'
    } else {
      return parseInt(num / 10000) + 'w+'
    }
  }
}
