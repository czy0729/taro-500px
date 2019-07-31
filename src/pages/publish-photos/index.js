/*
 * @Author: czy0729
 * @Date: 2019-07-22 15:19:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 12:01:08
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import CTextarea from '@base/c-textarea'
import CButton from '@base/c-button'
import ImagePicker from '@base/image-picker'
import Iconfont from '@base/iconfont'
import Tag from '@base/tag'
import { push } from '@utils'
import { filesDS } from '@constants/mock'
import './index.scss'

const cls = 'page-publish-photos'

@inject('appStore')
@observer
class PublishPhotos extends Component {
  config = {
    navigationBarTitleText: '发布图片'
  }

  state = {
    files: filesDS
  }

  onChange = newFiles => {
    this.setState({
      files: newFiles
    })
  }

  render() {
    const { files } = this.state
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__photos`}>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, filePath) => {
              push('/pages/photo-edit/index', {
                filePath: filePath.url
              })
            }}
          />
        </View>
        <View className={`${cls}__textarea`}>
          <CTextarea placeholder='说说关于图片的故事，参与合适的话题会获得更多浏览' />
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

export default PublishPhotos
