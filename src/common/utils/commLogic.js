/**
 * 封装公用的逻辑方法
 */
import { URLdata } from '../../store/localData/baseURL'

/**
 * 获取环境变量中的域名信息
 * @param {String} moduleName 环境变量模块名
 */
export function getBaseURL (moduleName) {
  return URLdata[moduleName] ? URLdata[moduleName] : ''
}
