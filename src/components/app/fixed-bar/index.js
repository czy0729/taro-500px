/*
 * @Author: czy0729
 * @Date: 2019-07-20 17:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 10:21:25
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Iconfont from '../../iconfont'
import './index.scss'

const cls = 'c-app-fixed-bar'

const FixedBar = ({ className }) => {
  return (
    <View className={classNames(cls, 'flex', className)}>
      <View className={`${cls}__placeholder flex-1`}>
        <Text className='t-24 l-32 t-sub'>有什么想问的？来评论</Text>
      </View>
      <View className={`${cls}__btn ml-16`}>
        <Iconfont className='t-44 t-title' name='comment' />
      </View>
      <View className={`${cls}__btn`}>
        <Iconfont className='t-44 t-title' name='star' />
      </View>
      <View className={`${cls}__btn`}>
        <Iconfont className='t-44 t-title' name='good' />
      </View>
      <View className={`${cls}__btn`}>
        <Iconfont className='t-44 t-title' name='share' />
      </View>
    </View>
  )
}

FixedBar.defaultProps = {
  className: ''
}

FixedBar.options = {
  addGlobalClass: true
}

export default observer(FixedBar)
