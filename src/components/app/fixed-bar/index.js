/*
 * @Author: czy0729
 * @Date: 2019-07-20 17:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 17:43:27
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// import Iconfont from '../../iconfont'
import './index.scss'

const cls = 'c-app-fixed-bar'

const FixedBar = ({ className }) => {
  return <View className={classNames(cls, className)} />
}

FixedBar.defaultProps = {
  className: ''
}

FixedBar.options = {
  addGlobalClass: true
}

export default observer(FixedBar)
