/*
 * @Author: czy0729
 * @Date: 2019-06-17 17:26:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 09:35:34
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { date } from '@utils'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import Tag from '@base/tag'
import BtnGood from '@app/btn-good'
import Share from '@app/share'
import { radius } from '@utils/style'
import { rootCls } from '../ds'

const cls = `${rootCls}__content`

const Content = ({ className, avatar, nickName, content, uploadedDate }) => {
  return (
    <View className={classNames(cls, className)}>
      <View className='flex'>
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
      <View className='mt-32' style={{ minHeight: Taro.pxTransform(240) }}>
        <Text className='t-30 l-48 t-desc'>{content}</Text>
      </View>
      <View className='flex flex-wrap mt-32'>
        <Tag type='link'># 无主灯照明</Tag>
      </View>
      <BtnGood className='mt-32' />
      <Share className='mt-40' />
    </View>
  )
}

Content.defaultProps = {
  avatar: '',
  nickName: '',
  content: '',
  uploadedDate: ''
}

Content.options = {
  addGlobalClass: true
}

export default observer(Content)
