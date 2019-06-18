/*
 * @Author: czy0729
 * @Date: 2019-06-18 15:16:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 15:48:46
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { CImage } from '@components'
import { lastDate } from '@utils'
import { radius } from '@utils/style'
import './item.scss'

const cls = 'page-detail__comments-item'

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
          <Text className='t-30 l-52 t-link t-c1'>
            {nickName}
            <Text className='t-sub'> @{userName}</Text>
          </Text>
        </View>
        <View>
          <Text className='t-30 l-52 t-desc'>{message}</Text>
        </View>
        <View className='flex mt-20'>
          <View className='flex-1'>
            <Text className='t-30 l-52 t-sub'>{lastDate(createDate)}</Text>
          </View>
          <View>
            <Text className='t-30 l-52 t-sub'>
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
