// 封装公用的函数
import { MessageBox, Message } from 'element-ui'
/**
 * 图片防止盗窃处理403
 * @param {string} url 图片链接
*/
export const disposeUrl = (url) => {
  if (url === '') { return '' }
  // 图片403防盗链处理
  return ('https://images.weserv.nl/?url=' + url.replace(/http\w{0,1}:\/\//, ''))
}
/**
 * 头部notice提醒
 * @param {string} msg  消息
 * @param {string} type 消息类型 'success' 'warning' 'error' 'info'
 */
export const noticeMsg = (msg, type) => {
  if (!msg) { return }
  type = type || 'info'
  Message({
    message: msg,
    type: type
  })
}
/**
 * alert类型
 * @param {string} msg 消息
 * @param {function} cb 回调
 * @param {string} title 标题
*/
export const msgAlert = (msg, cb, title) => {
  if (!msg) { return }
  msg = typeof msg === 'object' ? JSON.stringify(msg) : msg
  MessageBox.alert(msg, title || '提示消息', {
    confirmButtonText: '确定',
    callback: action => {
      if (cb) {
        cb(action)
      }
    }
  })
}

/**
 * log信息打印
 * @param {string} descript 描述信息
 * @param {string} info  打印信息
 * @param {string} type 信息类型 'WARN' 'ERROR' 'INFO'
 * @param {string} extraInfo  附加信息
 */
export const logShow = (descript, info, type, extraInfo) => {
  if (type) {
    type = type.toUpperCase()
  }
  var dataType = ''
  if (descript && !info && !extraInfo) {
    dataType = typeof (descript)
    if (dataType === 'object') {
      defLog(' #=>' + '(' + dataType + ') ' + JSON.stringify(descript), type)
    } else {
      defLog(' #=>' + '(' + dataType + ') ' + descript, type)
    }
  }
  if (descript && info + '') {
    dataType = typeof (info)
    var objString = dataType === 'object' ? JSON.stringify(info) : info
    if (!extraInfo) {
      defLog(descript + '(' + dataType + ')' + ' ==> ' + objString, type)
    } else {
      var extra = extraInfo === 'object' ? JSON.stringify(extraInfo) : extraInfo
      defLog(descript + '(' + dataType + ')' + ' ==> ' + objString + ' extra==>' + extra, type)
    }
  }
}

/**
 * 接口返回失败回调
 * @param {string} code 返回码/同上
 */
export const errCb = (code) => {
  switch (parseInt(code, 10)) {
    case -1:
      return () => {
        window.location.href = '/#/login'
      }
    case -40: // 店铺未通过审核
      return () => {
        window.location.href = '/#/switchShop'
      }
    default:
      break
  }
}
/**
 * 传统信息log
 * @param {string} msg 打印的信息
 * @param {string} type 消息类型
 */
export const defLog = (msg, type) => {
  switch (type) {
    case 'WARN':
      console.warn(msg)
      break
    case 'ERROR':
      console.error(msg)
      break
    default:
      console.log(msg)
  }
}
