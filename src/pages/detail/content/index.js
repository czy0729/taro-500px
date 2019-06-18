/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 15:34:13
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { date } from '@utils'
import { CImage, CButton } from '@components'
import { radius } from '@utils/style'

const cls = 'page-detail__content'

const Content = ({
  className,
  avatar,
  nickName,
  content,
  uploadedDate,
  liked
}) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='flex'>
        <CImage
          src={`${avatar}!p5`}
          width={Taro.pxTransform(92)}
          style={radius(Taro.pxTransform(92))}
        />
        <View className='flex-1 ml-20'>
          <Text className='t-36 t-desc t-b'>{nickName}</Text>
        </View>
        <CButton type='main' text='关注' size='mini' />
      </View>
      <View className='mt-20'>
        <Text className='t-32 l-60 t-desc'>{content}</Text>
      </View>
      <View className='flex mt-40'>
        <View className='flex-1'>
          <Text className='t-28 t-sub'>
            发布于 {date('y.m.d', uploadedDate)}
          </Text>
        </View>
        <Text className='t-28 t-sub'>{liked} 赞</Text>
      </View>
      {/* <View className='flex mt-40'>
        <View className='flex-1'>
          <Text className='t-28 t-sub'>分享:</Text>
        </View>
        <View className='flex-1'>
          <Text className='t-28 t-desc'>微信</Text>
        </View>
        <View className='flex-1'>
          <Text className='t-28 t-desc'>朋友圈</Text>
        </View>
        <View className='flex-1'>
          <Text className='t-28 t-desc'>微博</Text>
        </View>
      </View> */}
    </View>
  )
}

Content.defaultProps = {
  avatar: '',
  nickName: '',
  content: '',
  uploadedDate: '',
  liked: 0
}

Content.options = {
  addGlobalClass: true
}

export default observer(Content)
