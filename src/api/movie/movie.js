import { Http } from 'common/utils/Http'
import { config } from './httpConfig'
import baseConfig from '../../store/localData/baseConfig'
let http = new Http(config)
let moduleName = '/v2/movie/'

/**
 * 正在热映
 * @param {*} reqData
 * @param {*} onSuccess
 * @param {*} onError
 */
export async function inTheaters (reqData, onSuccess, onError) {
  let start = reqData.page
  let count = reqData.size
  let params = { start, count }
  let url = moduleName + 'in_theaters'
  const backWithReqData = JSON.stringify('参数为空', null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
  })
}

/**
 * 新片榜
 * @param {*} onSuccess
 * @param {*} onError
 */
export async function newMovies (onSuccess, onError) {
  let params = {}
  let url = moduleName + 'new_movies?apikey=' + baseConfig.apikey
  const backWithReqData = JSON.stringify('参数为空', null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
  })
}
/**
 * 搜索
 * @param {*} onSuccess
 * @param {*} onError
 */
export async function moviesSearch (reqData, onSuccess, onError) {
  let params = {}
  if (reqData.getType === 'tag') {
    let tag = reqData.search
    params = { tag }
  } else {
    let q = reqData.search
    params = { q }
  }
  let url = moduleName + 'search'
  const backWithReqData = JSON.stringify('参数为空', null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
  })
}
/**
 * 剧详情
 * @param {*} reqData
 * @param {*} onSuccess
 * @param {*} onError
 */
export async function detailInfo (reqData, onSuccess, onError) {
  let id = reqData.id
  let params = {}
  let url = moduleName + 'subject/' + id
  const backWithReqData = JSON.stringify('参数为空', null, 4)
  http.Get(url, params).then((res) => {
    onSuccess(res.data, backWithReqData)
  }, (err) => {
    onError(err, backWithReqData)
  })
}
