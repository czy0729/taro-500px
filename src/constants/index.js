/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:35:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 14:28:32
 */
import Taro from '@tarojs/taro'
import { getWindowHeight } from '@utils/style'

const H5 = process.env.TARO_ENV === 'h5'
const RN = process.env.TARO_ENV === 'rn'
const WEAPP = process.env.TARO_ENV === 'weapp'
const { screenWidth, screenHeight } = Taro.getSystemInfoSync()
const pxRatio = WEAPP ? screenWidth / 750 : 1

// 环境
export const ENV = {
  H5,
  RN,
  WEAPP,
  screenWidth,
  screenHeight,
  pxRatio,
  wind: 30,
  windowHeight: getWindowHeight()
}

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _list: [], // 用于某些方法制造分页效果
  _loaded: false
}
export const LIST_LIMIT = 20
export const LIST_LIMIT_COMMENTS = 8
