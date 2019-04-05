import { getBaseURL } from '../../common/utils/commLogic'

// 生产环境域名
const baseURL = getBaseURL('DB_API').api

const config = {
  baseURL
}

export { config }
