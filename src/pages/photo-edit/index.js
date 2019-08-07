/*
 * @Author: czy0729
 * @Date: 2019-07-31 11:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-07 18:00:47
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import Back from '@base/back'
import NavigationTitle from '@base/navigation-title'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import { getWindowHeight } from '@utils/style'
import Cropper from '@components/wx/cropper'
import imageNext from '@assets/common/next.png'
import Photos from './photos'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class PhotoEdit extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    current: 0,
    data: [],
    showCut: false,
    _loaded: false
  }

  componentDidMount() {
    const { appStore } = this.props
    const { current, data } = appStore.state.photoEdit
    this.setState({
      current,
      data,
      _loaded: true
    })
  }

  onSwiperChange = current => {
    this.setState({
      current
    })
  }

  onDataChange = data => {
    this.setState({
      data
    })
  }

  showCut = () => {
    this.setState({
      showCut: true
    })
  }

  hideCut = () => {
    this.setState({
      showCut: false
    })
  }

  onCut = img => {
    const { current, data } = this.state
    this.setState({
      data: data.map((item, index) =>
        index === current
          ? {
              ...item,
              url: img.path,
              width: img.width,
              height: img.height
            }
          : item
      ),
      showCut: false
    })
  }

  next = () => {
    const { appStore } = this.props
    const { data } = this.state
    console.log(JSON.stringify(data))
    appStore.savePhotoEditData({
      data
    })
    Taro.navigateBack()
  }

  renderSwiper() {
    const { current, data, _loaded } = this.state
    if (!_loaded) {
      return null
    }

    return (
      <Photos
        current={current}
        data={data}
        onSwiperChange={this.onSwiperChange}
        onDataChange={this.onDataChange}
      />
    )
  }

  renderToolbar() {
    return (
      <View className={`${cls}__toolbar flex`}>
        <View
          className={`${cls}__toolbar-item flex flex-column flex-1`}
          onClick={this.showCut}
        >
          <Iconfont className='t-48 t-plain' name='cut' />
          <Text className='t-26 l-48 t-default t-c mt-8'>裁剪</Text>
        </View>
        <View className={`${cls}__toolbar-item flex flex-column flex-1`}>
          <Iconfont className='t-48 t-plain' name='tag' />
          <Text className='t-26 l-48 t-default t-c mt-8'>标签</Text>
        </View>
        <View
          className={`${cls}__toolbar-item flex flex-column flex-1`}
          onClick={this.next}
        >
          <CImage src={imageNext} width={Taro.pxTransform(48)} />
          <Text className='t-26 l-48 t-default t-c mt-8'>下一步</Text>
        </View>
      </View>
    )
  }

  renderPreview() {
    return (
      <View className={`${cls}__preview`}>
        {this.renderToolbar()}
        {this.renderSwiper()}
      </View>
    )
  }

  renderCropper() {
    const { current, data } = this.state
    return (
      <Cropper
        imageSrc={data[current].url}
        onOk={this.onCut}
        onClose={this.hideCut}
      />
    )
  }

  render() {
    const { showCut } = this.state
    return (
      <View
        className={cls}
        style={{
          height: getWindowHeight()
        }}
      >
        <Back theme='light' />
        <NavigationTitle theme='light' text='图片编辑' />
        {showCut ? this.renderCropper() : this.renderPreview()}
      </View>
    )
  }
}

export default PhotoEdit
