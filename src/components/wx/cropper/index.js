/*
 * @Author: czy0729
 * @Date: 2019-07-31 14:20:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 18:10:40
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import { ENV } from '@constants'
import './index.scss'

const cls = 'c-wx-cropper'

class Cropper extends Component {
  static defaultProps = {
    show: false,
    imageSrc: '',
    cutRatio: 0,
    cropperRatio: 1,
    onOk: Function.prototype,
    onClose: Function.prototype
  }

  config = {
    usingComponents: {
      cropper: './Cropper/index'
    }
  }

  onOk = file => {
    const img = file.detail
    if (img && img.path) {
      const { onOk } = this.props
      onOk(img)
    }
  }

  renderToolbar() {
    const { onClose } = this.props
    return (
      <View className={`${cls}__toolbar flex`}>
        <View className={`${cls}__toolbar-item flex-1`} onClick={onClose}>
          <Text className='t-32 l-48 t-plain t-c'>取消</Text>
        </View>
        {/* <View className={`${cls}__toolbar-item flex-1`}>
          <Text className='t-32 l-48 t-plain t-c'>完成</Text>
        </View> */}
      </View>
    )
  }

  render() {
    const { imageSrc, cutRatio, cropperRatio } = this.props
    return (
      <View
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
      >
        <cropper
          imageSrc={imageSrc}
          cutRatio={cutRatio}
          cropperRatio={cropperRatio}
          onClose={this.onOk}
        />
        {this.renderToolbar()}
      </View>
    )
  }
}

export default Cropper
