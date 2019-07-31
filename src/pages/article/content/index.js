/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 09:52:00
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import CRichText from '@base/c-rich-text'
import Tag from '@base/tag'
import BtnGood from '@app/btn-good'
import Share from '@app/share'
import { date } from '@utils'
import { radius } from '@utils/style'
import { rootCls, infoDS } from '../ds'
import './index.scss'

const cls = `${rootCls}__content`

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
      <View className={`${cls}__content`}>
        <Text className='t-48 l-64 t-title t-b'>{title}</Text>
        <View className='flex mt-48'>
          <CImage
            src={`${avatar}!p1`}
            width={Taro.pxTransform(72)}
            style={radius(Taro.pxTransform(72))}
          />
          <View className='flex-1 ml-16'>
            <Text className='t-28 l-40 t-desc'>{nickName}</Text>
            <Text className='t-24 l-32 t-sub'>
              {uploadedDate ? date('y.m.d', uploadedDate) : '-'}
            </Text>
          </View>
          <CButton type='danger' ghost text='关注' size='mini' />
        </View>
        <View className={`${cls}__info flex mt-48`}>
          {infoDS.map(item => (
            <View key={item.label} className='flex-1'>
              <Text className='t-24 l-32 t-sub t-c'>{item.label}</Text>
              <Text className='t-32 l-48 t-title t-b t-c mt-8'>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        <View className='mt-64' style={{ minHeight: Taro.pxTransform(640) }}>
          <CRichText nodes={richText} />
        </View>
        <Text className='t-24 l-32 t-sub mt-48'>
          (C) 声明∶ 本页所有文字与图片禁止转载或发布
        </Text>
        <View className='flex flex-wrap mt-32'>
          <Tag type='link'># 无主灯照明</Tag>
        </View>
        <BtnGood className='mt-32' />
        <Share className='mt-40' />
      </View>
      <View className={`${cls}__author flex mt-40`}>
        <CImage
          src={`${avatar}!p1`}
          width={Taro.pxTransform(96)}
          style={radius(Taro.pxTransform(96))}
        />
        <View className='flex-1 ml-16'>
          <Text className='t-34 l-56 t-title t-b'>{nickName}</Text>
          <Text className='t-28 l-40 t-sub'>
            {uploadedDate ? date('y.m.d', uploadedDate) : '-'}
          </Text>
        </View>
        <CButton type='danger' ghost text='关注' size='mini' />
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
