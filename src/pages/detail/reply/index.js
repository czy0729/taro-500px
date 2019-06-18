/*
 * @Author: czy0729
 * @Date: 2019-06-18 16:48:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 16:57:02
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'

const cls = 'page-detail__reply'

const Reply = ({ className }) => {
  return <View className={classNames(cls, className)} />
}

Reply.defaultProps = {}

Reply.options = {
  addGlobalClass: true
}

export default observer(Reply)
