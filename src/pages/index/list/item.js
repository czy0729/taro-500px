/*
 * @Author: czy0729
 * @Date: 2019-06-11 22:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 11:00:06
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Img } from '@components'
import './index.scss'

const cls = 'page-index__list'

const ListItem = ({ url, height, user, title, count }) => {
  if (!url) {
    return null
  }

  return (
    <View className={`${cls}__item`}>
      <Image
        className={`${cls}__image`}
        src={`${url}!p1`}
        style={{
          height: `${height}px`
        }}
      />
      <View className='mt-sm'>
        <Text className='t-26 t-desc t-c2'>{title}</Text>
      </View>
      <View className='flex mt-sm'>
        <Img
          src={`${url}!p1`}
          width={42}
          style={{
            borderRadius: Taro.pxTransform(42),
            overflow: 'hidden'
          }}
        />
        <View className='flex-item ml-sm'>
          <Text className='t-22 t-sub t-c1'>{user}</Text>
        </View>
        <Text className='t-22 t-sub'>{count}</Text>
      </View>
    </View>
  )
}

ListItem.options = {
  addGlobalClass: true
}

ListItem.defaultProps = {
  url: '',
  width: 0,
  height: 0,
  user: '',
  title: '',
  count: ''
}

export default observer(ListItem)
