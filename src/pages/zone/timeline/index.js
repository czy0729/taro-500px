/*
 * @Author: czy0729
 * @Date: 2019-07-19 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:54:10
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Empty from '@base/empty'

const cls = 'page-zone__timeline'

const Timeline = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <Empty text='没有动态' />
    </View>
  )
}

Timeline.defaultProps = {
  className: ''
}

Timeline.options = {
  addGlobalClass: true
}

export default observer(Timeline)
