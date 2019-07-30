/*
 * @Author: czy0729
 * @Date: 2019-06-11 22:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:03:15
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@components/base/c-image'
import Iconfont from '@components/base/iconfont'
import { transform } from '@utils/style'
import './index.scss'

const cls = 'c-app-masonry-list__item'

const Item = ({
  detailId,
  url,
  height,
  user,
  avatar,
  title,
  count,
  time,
  onClick
}) => {
  if (!detailId) {
    return null
  }

  return (
    <View className={cls} onClick={onClick}>
      <View className={`${cls}__media`}>
        <Image
          className={`${cls}__image`}
          src={`${url}!p1`}
          style={{
            height: transform(height)
          }}
        />
        {!!time && (
          <View className={`${cls}__mask flex flex-justify-center`}>
            <Iconfont className='t-44 t-plain' name='search' />
            <Text className={`${cls}__time t-24 l-32 t-plain`}>{time}</Text>
          </View>
        )}
      </View>
      <View>
        <Text className='t-28 l-44 t-title t-c2 mt-16'>{title}</Text>
      </View>
      <View className='flex mt-8'>
        <CImage
          src={`${avatar}!p1`}
          width={Taro.pxTransform(32)}
          style={{
            borderRadius: Taro.pxTransform(32),
            overflow: 'hidden'
          }}
        />
        <View className='flex-item ml-8'>
          <Text className='t-24 l-32 t-sub t-c1'>{user}</Text>
        </View>
        <Iconfont className='t-28 t-sub ml-8' name='star' />
        <Text className='t-24 l-32 t-sub ml-4 mr-16'>{count}</Text>
      </View>
    </View>
  )
}

Item.options = {
  addGlobalClass: true
}

Item.defaultProps = {
  detailId: '',
  url: '',
  width: 0,
  height: 0,
  user: '',
  avatar: '',
  title: '',
  count: '',
  time: '',
  onClick: Function.prototype
}

export default observer(Item)
