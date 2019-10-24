class FullScreenBase {
  constructor () {
    this.name = 'FullScreenMethod'
    this.histStuts = false
    this.callbacks = []
    this.addEvents()
  }

  addEvents () {
    const DOC = document
    const that = this
    // 监听不同浏览器的全屏事件，并件执行相应的代码
    document.addEventListener('webkitfullscreenchange', function () {
      if (document.webkitIsFullScreen) {
        // 全屏后要执行的代码
        that.statusChange(true)
      } else {
        // 退出全屏后执行的代码
        that.statusChange(false)
      }
    }, false)

    document.addEventListener('fullscreenchange', function () {
      if (DOC.fullscreen) {
        // 全屏后执行的代码
        that.statusChange(true)
      } else {
        // 退出全屏后要执行的代码
        that.statusChange(false)
      }
    }, false)

    document.addEventListener('mozfullscreenchange', function () {
      const DOC = document
      if (DOC.mozFullScreen) {
        // 全屏后要执行的代码
        that.statusChange(true)
      } else {
        // 退出全屏后要执行的代码
        that.statusChange(false)
      }
    }, false)

    document.addEventListener('msfullscreenchange', function () {
      if (DOC.msFullscreenElement) {
        // 全屏后要执行的代码
        that.statusChange(true)
      } else {
        // 退出全屏后要执行的代码
        that.statusChange(false)
      }
    }, false)
  }

  requestFullScreen (element) {
    const WDS = window
    const ELE = element || window.document.documentElement
    //  判断各种浏览器，找到正确的方法
    if (ELE.requestFullscreen) {
      ELE.requestFullscreen()
    } else if (ELE.msRequestFullscreen) {
      ELE.msRequestFullscreen()
    } else if (ELE.mozRequestFullScreen) {
      ELE.mozRequestFullScreen()
    } else if (ELE.webkitRequestFullScreen) {
      ELE.webkitRequestFullScreen()
    } else {
      const ActiveXObject = WDS.ActiveXObject
      if (typeof WDS.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }

  // 退出全屏 判断浏览器种类
  exitFull () {
    const DOC = document
    const WDS = window
    //  判断各种浏览器，找到正确的方法
    if (DOC.exitFullscreen) {
      DOC.exitFullscreen()
    } else if (DOC.msExitFullscreen) {
      DOC.msExitFullscreen()
    } else if (DOC.mozCancelFullScreen) {
      DOC.mozCancelFullScreen()
    } else if (DOC.webkitCancelFullScreen) {
      DOC.webkitCancelFullScreen()
    } else {
      const ActiveXObject = WDS.ActiveXObject
      if (typeof WDS.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }

  statusChange (val) {
    if (this.histStuts !== val) {
      for (let i = 0; i < this.callbacks.length; i++) {
        const callback = this.callbacks[i]
        if (callback) callback(val)
      }
    }
    this.histStuts = val
  }

  /**
   * 全屏事件监听
   * @param callBack_
   */
  addFullScreenChangeEvent (callBack) {
    this.callbacks.push(callBack)
  }

  removeHandler (m_) {
    this.callbacks.splice(this.callbacks.indexOf(m_), 1)
  }
}

const FullScreen = new FullScreenBase()
export { FullScreen }
