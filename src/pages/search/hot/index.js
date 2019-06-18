/*
 * @Author: czy0729
 * @Date: 2019-06-13 10:14:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 17:01:10
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import { Tag, Iconfont } from '@components'
import './index.scss'

const cls = 'page-search__hot'
const DS = [
  {
    id: 1,
    title: '小云台灯'
  },
  {
    id: 2,
    title: '小云轻智能'
  }
]

const Hot = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='flex'>
        <View className='flex-1'>
          <Text className='t-28 l-36 t-sub'>热门搜索</Text>
        </View>
        <Iconfont className='t-36 t-sub' name='trash' />
      </View>
      <View className='flex mt-30'>
        {DS.map(item => (
          <Tag key={item.id} className='mr-30'>
            {item.title}
          </Tag>
        ))}
      </View>
    </View>
  )
}

Hot.defaultProps = {
  className: ''
}

Hot.options = {
  addGlobalClass: true
}

export default observer(Hot)
