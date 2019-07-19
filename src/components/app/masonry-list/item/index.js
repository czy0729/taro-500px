/*
 * @Author: czy0729
 * @Date: 2019-06-11 22:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-18 16:37:31
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { transform } from '@utils/style'
import CImage from '../../../img'
import Iconfont from '../../../iconfont'
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
  onClick
}) => {
  if (!detailId) {
    return null
  }

  return (
    <View className={cls} onClick={onClick}>
      <Image
        className={`${cls}__image`}
        src={`${url}!p1`}
        style={{
          height: transform(height)
        }}
      />
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
        <Iconfont className='t-32 t-sub ml-8' name='star' />
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
  onClick: Function.prototype
}

export default observer(Item)
