/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:35:10
 * @Last Modified by:   czy0729
 * @Last Modified time: 2019-06-10 11:35:10
 */
// 环境
export const ENV = {
  H5: process.env.TARO_ENV === 'h5',
  RN: process.env.TARO_ENV === 'rn',
  WEAPP: process.env.TARO_ENV === 'weapp'
}
