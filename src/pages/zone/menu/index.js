/*
 * @Author: czy0729
 * @Date: 2019-07-17 16:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 16:21:58
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import './index.scss'

const cls = 'page-zone__menu'
const DS = [
  {
    label: '图片',
    value: 228
  },
  {
    label: '视频',
    value: 10
  },
  {
    label: '文章',
    value: 10
  }
]

const Menu = ({ className }) => {
  return (
    <View className={classNames(cls, 'flex', className)}>
      {DS.map(item => (
        <View key={item.label} className={classNames(`${cls}__item`, 'flex-1')}>
          <Text className='t-36 l-48 t-title t-b t-c'>{item.value}</Text>
          <Text className='t-24 l-32 t-desc t-c mt-8'>{item.label}</Text>
        </View>
      ))}
    </View>
  )
}

Menu.defaultProps = {
  className: ''
}

Menu.options = {
  addGlobalClass: true
}

export default observer(Menu)
