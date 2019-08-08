/*
 * @Author: czy0729
 * @Date: 2019-08-08 20:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2019-08-08 20:30:00
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import Tag from '@components/base/tag'
import Iconfont from '@components/base/iconfont'
import { rootCls } from '../ds'
import './index.scss'

const cls = `${rootCls}__history`

const History = ({ className, data }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='flex'>
        <View className='flex-1'>
          <Text className='t-28 l-44 t-sub'>最近添加</Text>
        </View>
        <Iconfont className='t-36 t-sub' name='trash' />
      </View>
      <View className='flex flex-wrap mt-32'>
        {data.map(item => (
          <Tag key={item} className='mr-24 mb-24'>
            {item}
          </Tag>
        ))}
      </View>
    </View>
  )
}

History.defaultProps = {
  className: '',
  data: []
}

History.options = {
  addGlobalClass: true
}

export default observer(History)
