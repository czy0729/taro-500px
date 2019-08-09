/*
 * @Author: czy0729
 * @Date: 2019-07-23 17:59:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 14:52:14
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text, Editor } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import CImage from '@base/c-image'
import CInput from '@base/c-input'
import CButton from '@base/c-button'
import Iconfont from '@base/iconfont'
import './index.scss'

const cls = 'page-publish-article'

@inject('appStore')
@observer
class PublishArticle extends Component {
  config = {
    navigationBarTitleText: '发布文章'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__cover`}>
          <CImage
            src='https://img.500px.me/graphic/cff75da1644acb03b157811d2375a9781/513b4810760f4296abb5a788753a0984.jpg!p5'
            width={Taro.pxTransform(264)}
            height={Taro.pxTransform(176)}
            radius='sm'
          />
        </View>
        <View className={`${cls}__title`}>
          <CInput placeholder='请输入标题' />
        </View>
        <Editor
          showImgSize
          showImgToolbar
          showImgResize
          placeholder='请输入正文'
        />
        <View className={`${cls}__fixed flex`}>
          <View className={`${cls}__btn flex flex-column`}>
            <Iconfont className='t-40 t-title' name='view' />
            <Text className='t-22 l-32 t-sub mt-4'>预览</Text>
          </View>
          <View className={`${cls}__btn flex flex-column`}>
            <Iconfont className='t-40 t-title' name='save' />
            <Text className='t-22 l-32 t-sub mt-4'>保存</Text>
          </View>
          <View className='flex-1 ml-32'>
            <CButton type='danger'>发布</CButton>
          </View>
        </View>
      </CScrollView>
    )
  }
}

export default PublishArticle
