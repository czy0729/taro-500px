/*
 * @Author: czy0729
 * @Date: 2019-06-18 15:16:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 09:57:34
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { lastDate } from '@utils'
import { radius } from '@utils/style'
import CImage from '../../../img'
import './index.scss'

const cls = 'c-app-comments__item'

const Item = ({
  className,
  index,
  sub,
  avatar,
  nickName,
  userName,
  message,
  createDate
}) => {
  const avatarWidth = sub ? 44 : 64
  return (
    <View className={classNames(cls, 'flex flex-align-start', className)}>
      <CImage
        className='mt-32'
        src={`${avatar}!p1`}
        width={Taro.pxTransform(avatarWidth)}
        style={radius(avatarWidth)}
      />
      <View
        className={classNames(`${cls}__wrap`, 'flex-1 ml-16', {
          [`${cls}__wrap--border`]: index !== 0
        })}
      >
        <View className='flex'>
          <Text className='t-28 l-48 t-desc t-c1'>{nickName}</Text>
          {!!userName && (
            <Text className='t-24 l-48 t-sub ml-16'>@{userName}</Text>
          )}
        </View>
        <Text className={`${cls}__message t-30 l-48 t-title mt-16`}>
          {message}
          <Text
            className='t-24 l-42 t-sub ml-16'
            style={{
              display: 'inline-block'
            }}
          >
            {lastDate(createDate)}
          </Text>
        </Text>
      </View>
    </View>
  )
}

Item.defaultProps = {
  className: '',
  index: '',
  sub: false,
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
