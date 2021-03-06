/*
 * @Author: czy0729
 * @Date: 2019-06-13 11:32:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-13 15:55:47
 */
import Taro from '@tarojs/taro'

const WEAPP = process.env.TARO_ENV === 'weapp'

export const { screenWidth, screenHeight } = Taro.getSystemInfoSync()
export const pxRatio = WEAPP ? screenWidth / 750 : 1
export const statusBarHeight = 40

export const colorPlain = 'rgb(255, 255, 255)'
export const colorMain = '#a89666'
export const colorDanger = '#e6211b'
export const colorDesc = '#282828'
export const colorSub = '#999'
export const colorDefault = '#adadad'
export const colorBg2 = '#ededed'
export const radiusXs = 6
export const radiusSm = 12
