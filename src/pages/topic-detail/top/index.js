/*
 * @Author: czy0729
 * @Date: 2019-08-23 10:02:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 11:07:49
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import CImage from '@base/c-image'
import CButton from '@base/c-button'
import { transform } from '@utils/style'
import { ENV } from '@constants'
import { rootCls, detail } from '../ds'
import './index.scss'

const cls = `${rootCls}__top`
const height = ENV.screenWidth * 0.42667

function Top({ className }) {
  return (
    <View className={classNames(cls, className)}>
      <View
        className={`${cls}__wrap`}
        style={{
          height: transform(height)
        }}
      >
        <View className={`${cls}__cover`}>
          <CImage src={detail.cover} height={height} />
        </View>
        <Text className='t-40 l-56 t-plain t-b t-c1'>{detail.title}</Text>
        <Text
          className={classNames(`${cls}__extra`, 't-22 t-24 t-plain mt-24')}
        >
          回答 {detail.answer}　关注 {detail.follow}
        </Text>
        <View className={`${cls}__button`}>
          <CButton type='danger' text='关注话题' size='mini' plain />
        </View>
      </View>
      <View className={`${cls}__detail`}>
        <Text className='t-26 l-40 t-desc'>{detail.detail}</Text>
      </View>
    </View>
  )
}

Top.options = {
  addGlobalClass: true
}

export default observer(Top)
