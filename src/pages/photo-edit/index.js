/*
 * @Author: czy0729
 * @Date: 2019-07-31 11:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 18:21:43
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Back from '@base/back'
import NavigationTitle from '@base/navigation-title'
import CImage from '@base/c-image'
import Iconfont from '@base/iconfont'
import Cropper from '@components/wx/cropper'
import { ENV } from '@constants'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

class PhotoEdit extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    filePath: '',
    showCut: false
  }

  componentDidMount() {
    const {
      filePath = 'https://img.500px.me/graphic/cf33791224fa993890f992da405e47519/03244742c2374c9d816ed64bebcfb130.jpg!p5'
    } = this.$router.params

    this.setState({
      filePath
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

  changeFile = img => {
    console.log(img)
    this.setState({
      filePath: img.path,
      showCut: false
    })
  }

  renderPreview() {
    const { filePath } = this.state
    return (
      <View
        className='flex'
        style={{
          height: ENV.windowHeight
        }}
      >
        <CImage
          src={filePath}
          mode='widthFix'
          style={{
            height: 'initial'
          }}
        />
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
          <View className={`${cls}__toolbar-item flex flex-column flex-1`}>
            <Iconfont className='t-48 t-plain' name='cut' />
            <Text className='t-26 l-48 t-default t-c mt-8'>下一步</Text>
          </View>
        </View>
      </View>
    )
  }

  renderCropper() {
    const { filePath } = this.state
    return (
      <Cropper
        imageSrc={filePath}
        onOk={this.changeFile}
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
          height: ENV.windowHeight
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
