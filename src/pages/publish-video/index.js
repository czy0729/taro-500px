/*
 * @Author: czy0729
 * @Date: 2019-07-25 09:33:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:49:02
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import CImage from '@base/c-image'
import CTextarea from '@base/c-textarea'
import CButton from '@base/c-button'
import Tag from '@base/tag'
import Iconfont from '@base/iconfont'
import VideoMask from '@app/video-mask'
import './index.scss'

const cls = 'page-publish-video'

@inject('appStore')
@observer
class PublishVideo extends Component {
  config = {
    navigationBarTitleText: '发布视频'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__video flex`}>
          <VideoMask>
            <CImage
              src='https://img.500px.me/graphic/cff75da1644acb03b157811d2375a9781/513b4810760f4296abb5a788753a0984.jpg!p5'
              width={Taro.pxTransform(176)}
              height={Taro.pxTransform(176)}
              radius='sm'
            />
          </VideoMask>
        </View>
        <View className={`${cls}__textarea`}>
          <CTextarea placeholder='多多分享想法和经验，参与合适的话题会获得更多浏览' />
        </View>
        <View className={`${cls}__tags`}>
          <View className='flex'>
            <View className='flex flex-1'>
              <Iconfont className='t-32 t-icon' name='topic' />
              <Text className='t-30 l-48 t-title ml-8'>参与话题</Text>
              <Text className='t-24 l-48 t-icon'>
                （参与话题会被更多人发现）
              </Text>
            </View>
            <Iconfont className='t-32 t-default' name='angle-right' />
          </View>
          <View className='flex flex-wrap mt-32'>
            <Tag className='mr-24 mb-24' type='link'>
              # 无主灯照明
            </Tag>
            <Tag className='mr-24 mb-24' type='link'>
              # 别墅照明
            </Tag>
          </View>
        </View>
        <View className={`${cls}__fixed`}>
          <CButton type='danger'>发布</CButton>
        </View>
      </CScrollView>
    )
  }
}

export default PublishVideo
