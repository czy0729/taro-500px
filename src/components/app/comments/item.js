/*
 * @Author: czy0729
 * @Date: 2019-06-18 15:16:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 15:08:12
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { lastDate } from '@utils'
import { radius } from '@utils/style'
import CImage from '../../img'
import './item.scss'

const cls = 'c-app-comments__item'

const Item = ({
  className,
  index,
  avatar,
  nickName,
  userName,
  message,
  createDate,
  countLike
}) => {
  return (
    <View
      className={classNames(
        cls,
        {
          [`${cls}--border`]: index !== 0
        },
        'flex flex-align-start',
        className
      )}
    >
      <CImage
        className={`${cls}__image`}
        src={`${avatar}!p1`}
        width={Taro.pxTransform(80)}
        style={radius(80)}
      />
      <View className='flex-1 ml-28'>
        <View>
          <Text className='t-28 l-40 t-link t-c1'>
            {nickName}
            <Text className='t-sub'> @{userName}</Text>
          </Text>
        </View>
        <View className='mt-12'>
          <Text className='t-28 l-40 t-desc'>{message}</Text>
        </View>
        <View className='flex mt-20'>
          <View className='flex-1'>
            <Text className='t-28 l-40 t-sub'>{lastDate(createDate)}</Text>
          </View>
          <View>
            <Text className='t-28 l-40 t-sub'>
              {countLike == 0 ? '' : countLike} 赞
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

Item.defaultProps = {
  className: '',
  index: '',
  avatar: '',
  nickName: '',
  userName: '',
  message: '',
  createDate: 0,
  countLike: 0
}

Item.options = {
  addGlobalClass: true
}

export default observer(Item)
