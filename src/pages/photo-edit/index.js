/*
 * @Author: czy0729
 * @Date: 2019-07-31 11:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 17:14:21
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import Back from '@base/back'
import NavigationTitle from '@base/navigation-title'
import Cropper from '@components/wx/cropper'
import { push, back } from '@utils'
import { getWindowHeight } from '@utils/style'
import Photos from './photos'
import Toolbar from './toolbar'
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

  onShowCut = () => {
    this.setState({
      showCut: true
    })
  }

  onHideCut = () => {
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

  onTag = () => {
    const { appStore } = this.props
    const { current, data } = this.state

    appStore.savePhotoEditData({
      current,
      _data: data,
      _onUpdate: newData => {
        this.setState({
          data: newData
        })
      }
    })

    push('/pages/tags/index')
  }

  onNext = () => {
    const { appStore } = this.props
    const { data } = this.state
    appStore.savePhotoEditData({
      data
    })
    back()
  }

  renderPreview() {
    const { current, data, _loaded } = this.state
    return (
      <View className={`${cls}__preview`}>
        <Toolbar
          onShowCut={this.onShowCut}
          onTag={this.onTag}
          onNext={this.onNext}
        />
        {_loaded && (
          <Photos
            current={current}
            data={data}
            onSwiperChange={this.onSwiperChange}
            onDataChange={this.onDataChange}
          />
        )}
      </View>
    )
  }

  renderCropper() {
    const { current, data } = this.state
    return (
      <Cropper
        imageSrc={data[current].url}
        onOk={this.onCut}
        onClose={this.onHideCut}
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
