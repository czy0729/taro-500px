/*
 * @Author: czy0729
 * @Date: 2019-06-28 11:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-28 15:16:11
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CButton, CImage, Iconfont } from '@components'
import { ENV } from '@constants'
import './index.scss'

const cls = 'page-preview'
const menuDS = [
  {
    text: '发布文章',
    icon: 'document-fill'
  },
  {
    text: '发布图片',
    icon: 'picture-fill'
  },
  {
    text: '发布视频',
    icon: 'video-fill'
  },
  {
    text: '发布案例',
    icon: 'camera-fill'
  }
]

class Preview extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'black'
  }

  renderPlan() {
    return (
      <View className={`${cls}__plan flex flex-justify-center`}>
        <View>
          <View className={`${cls}__wrap`}>
            <Text className={`${cls}__title t-36 l-36 t-desc`}>
              正在征集
            </Text>
          </View>
          <View className='mt-20'>
            <Text className='t-44 l-52 t-desc t-b'>晒晒你家的照明方案</Text>
          </View>
          <View className='flex flex-justify-end mt-20'>
            <CButton
              className='ml-sm'
              type='main'
              text='点击参与'
              size='mini'
              style={{
                width: Taro.pxTransform(144)
              }}
            />
          </View>
        </View>
        <View className={`${cls}__thumbs`}>
          <CImage
            src={require('../../assets/pages/index/12.png')}
            width={Taro.pxTransform(80)}
            radius
            style={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <CImage
            src={require('../../assets/pages/index/13.png')}
            width={Taro.pxTransform(160)}
            radius
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              right: 0
            }}
          />
        </View>
      </View>
    )
  }

  renderPublish() {
    return (
      <View className={`${cls}__publish`}>
        <View className='flex'>
          {menuDS.map(item => (
            <View key={item.text} className='flex flex-column flex-1'>
              <View className={`${cls}__icon flex flex-justify-center`}>
                <Iconfont className='t-52 t-plain' name={item.icon} />
              </View>
              <View className='mt-30'>
                <Text className='t-24 l-32 t-desc'>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
        <View
          className={`${cls}__btn-close flex flex-justify-center`}
          onClick={() => Taro.navigateBack()}
        >
          <Iconfont className='t-28 t-desc t-b' name='close' />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
      >
        {this.renderPlan()}
        {this.renderPublish()}
      </View>
    )
  }
}

export default Preview
