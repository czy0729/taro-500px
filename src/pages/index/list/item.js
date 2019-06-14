/*
 * @Author: czy0729
 * @Date: 2019-06-11 22:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-14 15:42:48
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { Img, Iconfont } from '@components'
import './index.scss'

const cls = 'page-index__list'

const Item = ({ url, height, user, avatar, title, count }) => {
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
      <View className='mt-20'>
        <Text className='t-30 l-48 t-desc t-c2'>{title}</Text>
      </View>
      <View className='flex mt-20'>
        <Img
          src={`${avatar}!p1`}
          width={40}
          style={{
            borderRadius: Taro.pxTransform(40),
            overflow: 'hidden'
          }}
        />
        <View className='flex-item ml-8'>
          <Text className='t-28 l-40 t-sub t-c1'>{user}</Text>
        </View>
        <Iconfont className='t-36 t-sub ml-8' name='star' />
        <Text className='t-28 l-40 t-sub ml-8'>{count}</Text>
      </View>
    </View>
  )
}

Item.options = {
  addGlobalClass: true
}

Item.defaultProps = {
  url: '',
  width: 0,
  height: 0,
  user: '',
  avatar: '',
  title: '',
  count: ''
}

export default observer(Item)
