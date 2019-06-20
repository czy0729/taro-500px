/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 15:04:46
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { date } from '@utils'
import { CImage, CButton, CRichText } from '@components'
import { radius } from '@utils/style'
import './index.scss'

const cls = 'page-article__content'
const infoDS = [
  {
    label: '户型',
    value: '两室'
  },
  {
    label: '使用面积',
    value: '85平'
  },
  {
    label: '灯具花费',
    value: '2万元'
  },
  {
    label: '位置',
    value: '广州'
  }
]

const Content = ({
  className,
  title,
  avatar,
  nickName,
  richText,
  uploadedDate
}) => {
  return (
    <View className={classNames(cls, className)}>
      <View>
        <Text className='t-52 l-72 t-desc t-b'>{title}</Text>
      </View>
      <View className='flex mt-30'>
        <CImage
          src={`${avatar}!p1`}
          width={Taro.pxTransform(48)}
          style={radius(Taro.pxTransform(48))}
        />
        <View className='flex-1 ml-20'>
          <Text className='t-30 t-desc'>{nickName}</Text>
        </View>
      </View>
      <View className={`${cls}__info flex mt-40`}>
        {infoDS.map(item => (
          <View key={item.label} className='flex-1'>
            <View>
              <Text className='t-24 l-32 t-sub'>{item.label}</Text>
            </View>
            <View className='mt-8'>
              <Text className='t-30 l-36 t-desc t-b'>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
      <CRichText className='mt-40' nodes={richText} />
      <View className='mt-40'>
        <View>
          <Text className='t-28 t-sub'>
            创建于 {date('y.m.d', uploadedDate)}
          </Text>
        </View>
        <View className='mt-20'>
          <Text className='t-28 t-sub'>
            (C) 声明∶ 本页所有文字与图片禁止转载或发布
          </Text>
        </View>
      </View>
      <View className='flex mt-40'>
        <CImage
          src={`${avatar}!p1`}
          width={Taro.pxTransform(92)}
          style={radius(Taro.pxTransform(92))}
        />
        <View className='flex-1 ml-20'>
          <Text className='t-36 t-desc t-b'>{nickName}</Text>
        </View>
        <CButton type='main' text='关注' size='mini' />
      </View>
    </View>
  )
}

Content.defaultProps = {
  className: '',
  title: '',
  avatar: '',
  nickName: '',
  richText: '',
  uploadedDate: 0
}

Content.options = {
  addGlobalClass: true
}

export default observer(Content)
