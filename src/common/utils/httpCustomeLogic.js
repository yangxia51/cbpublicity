// 封装拦截器
import { msgAlert, logShow, errCb } from '../utils/commUtils'
import { Loading } from 'element-ui'
/**
 * http请求自定义逻辑控制
 */
let httpLogic = {
  loading: '',
  /**
   * 对自定义http请求配置做处理
   * @param {Object} customeConfig 自定义http请求配置
   * @returns customeConfig处理之后的配置文件
   */

  dealConfig (customeConfig) {
    if (process.env.NODE_ENV === 'development') { // 如果是开发环境，则去除baseURL，通过代理处理请求，以解决跨域问题
      customeConfig.baseURL = ''
    }
    return customeConfig
  },

  /**
     * 拦截器-请求前的逻辑方法
     * @param {Object} config 请求前的http配置
     * @returns config拦截器处理之后的配置
     */
  requestInterceptors (config) {
    if (config.disLoadingFlag) { } else {
      this.loading = Loading.service({ fullscreen: true })
    }
    return config
  },

  /**
   * 拦截器-响应后的逻辑方法
   * @param {Object} response 请求后的的http返回结果
   * @returns 拦截器处理之后的返回结果
   */
  responseInterceptors (response) {
    if (this.loading) {
      this.loading.close()
    }
    let success
    if (response.hasOwnProperty('status') && response.status === 200) { success = true }
    if (success) {
      return response
    } else {
      msgAlert(response.msg, errCb(response.result + ''), '错误提示')
      return Promise.reject(response.data)
    }
  },

  /**
   * 拦截器-error统一处理方法
   * @param {any} error 错误对象
   * @param {any} type 拦截类型：1.beforeRequest请求前拦截 2.afterResponse请求后拦截
   * @returns 返回promise错误
   */
  InterceptorsError (type, error) {
    this.loading.close()
    logShow(type + 'Error', error, 'ERROR')
    switch (type) {
      case 'beforeRequest':

        break
      case 'afterResponse':
        if (error.message.indexOf('timeout') > -1) {
          error.msg = '亲的网速有点卡呢~'
        } else {
          if (error.response && error.response.status) {
            switch (error.response.status) {
              case 400:
                error.msg = '服务器未能理解请求:' + error.response.status
                break
              case 404:
                error.msg = '服务未被找到:' + error.response.status
                break
              case 405:
                error.msg = '请求的方法不被允许:' + error.response.status
                break
              case 500:
                error.msg = '请求未完成:' + error.response.status
                break
              case 502:
                error.msg = '无效的响应:' + error.response.status
                break
              case 503:
                error.msg = '服务器过载或当机:' + error.response.status
                break
              case 504:
                error.msg = '网关超时:' + error.response.status
                break
              case 505:
                error.msg = '不支持的http协议:' + error.response.status
                break
            }
          }
        }
        break
      default:
        break
    }
    msgAlert(error.msg, errCb(), '错误提示')
    return Promise.reject(error)
  }
}
export {
  httpLogic
}
