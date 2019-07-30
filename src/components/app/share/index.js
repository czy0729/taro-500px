/*
 * @Author: czy0729
 * @Date: 2019-07-20 15:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:03:44
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Iconfont from '@components/base/iconfont'
import './index.scss'

const cls = 'c-app-share'

const Share = ({ className }) => {
  return (
    <View className={classNames(cls, className)}>
      <Text className='t-24 l-36 t-sub'>分享到</Text>
      <View className='flex mt-32'>
        <View className={`${cls}__item flex flex-justify-center flex-1`}>
          <Iconfont
            className='t-40'
            name='wechat'
            style={{
              color: '#46bb36'
            }}
          />
          <Text className='t-28 l-40 t-desc ml-8'>微信好友</Text>
        </View>
        <View className={`${cls}__item flex flex-justify-center flex-1 ml-16`}>
          <Iconfont
            className='t-40'
            name='moment'
            style={{
              color: '#52ae71'
            }}
          />
          <Text className='t-28 l-40 t-desc ml-8'>朋友圈</Text>
        </View>
        <View className={`${cls}__item flex flex-justify-center flex-1 ml-16`}>
          <Iconfont
            className='t-40'
            name='weibo'
            style={{
              color: '#fc5e4f'
            }}
          />
          <Text className='t-28 l-40 t-desc ml-8'>微博</Text>
        </View>
      </View>
    </View>
  )
}

Share.defaultProps = {
  className: ''
}

Share.options = {
  addGlobalClass: true
}

export default observer(Share)
