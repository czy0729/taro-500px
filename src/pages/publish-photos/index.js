/*
 * @Author: czy0729
 * @Date: 2019-07-22 15:19:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 16:17:33
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { CScrollView, CTextarea, CButton, Tag } from '@components'
// import { filesDS } from '@constants/mock'
import './index.scss'

const cls = 'page-publish-photos'

@inject('appStore')
@observer
class PublishPhotos extends Component {
  config = {
    navigationBarTitleText: '发布图片'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__container`}>
          <View className={`${cls}__upload`}>1</View>
          <View className={`${cls}__textarea`}>
            <CTextarea placeholder='说说关于图片的故事，参与合适的话题会获得更多浏览' />
          </View>
        </View>
        <View className={`${cls}__fixed`}>
          <CButton type='danger'>发布</CButton>
        </View>
        <View className={`${cls}__tags flex flex-wrap`}>
          <Tag className='ml-24 mb-24' type='link'>
            # 无主灯照明
          </Tag>
          <Tag className='ml-24 mb-24' type='link'>
            # 别墅照明
          </Tag>
        </View>
      </CScrollView>
    )
  }
}

export default PublishPhotos
