import axios from 'axios'
import Qs from 'qs'
import _object from 'lodash/fp/object'

import { baseHttpConfig as baseConfig } from '../../config/baseHttpConfig'
import { httpLogic } from './httpCustomeLogic'
import { logShow } from '../utils/commUtils'

var Promise = require('core-js/es6/promise')
// 封装http将axios请求封装成实例,去调用get等方法
class Http {
  constructor(customeConfig) {
    var config = {
      withCredentials: true,
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      transformResponse: [function (data) { // 传输前改动
        if (typeof data !== 'object') {
          let serializedData = JSON.parse(data)
          return serializedData
        } else {
          return data
        }
      }]
    }

    customeConfig = httpLogic.dealConfig(customeConfig) // 对配置文件进行处理，比如如果是开发环境，则去除baseURL，通过代理处理请求，以解决跨域问题

    const configs = _object.defaultsDeep(_object.defaultsDeep(config, baseConfig), customeConfig) // 配置合并

    this.instance = axios.create(configs) // 创建axios新实例

    // 拦截器：请求前 查看入参
    this.instance.interceptors.request.use(config => {
      return httpLogic.requestInterceptors(config)
    }, error => {
      return httpLogic.InterceptorsError('beforeRequest', error)
    })

    // 拦截器：响应后 查看数据源是否存在问题
    this.instance.interceptors.response.use(response => {
      return httpLogic.responseInterceptors(response)
    }, error => {
      return httpLogic.InterceptorsError('afterResponse', error)
    })
  }

  Get (url, data = {}) {
    return new Promise((resolve, reject) => {
      this.instance({
        method: 'get',
        url: url,
        params: data
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
          logShow(error.msg)
        })
    })
  }
  Post (url, data = {}, upload = false) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, data, {
        transformRequest: [function (data, headers) {
          if (upload) {
            return data
          } else {
            let serializedData = JSON.stringify(data)
            return serializedData
          }
        }]
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
          logShow(error.msg)
        })
    })
  }
  Put (url, data = {}) {
    return new Promise((resolve, reject) => {
      this.instance.put(url, data, {
        transformRequest: [function (data, headers) {
          let serializedData = JSON.stringify(data)
          return serializedData
        }]
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
          logShow(error.msg)
        })
    })
  }
  Delete (url, data = {}) {
    return new Promise((resolve, reject) => {
      this.instance({
        method: 'delete',
        url: url,
        data: data,
        params: {}
      })
        .then((response) => {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
          logShow(error.msg)
        })
    })
  }
}

export {
  Http
}
