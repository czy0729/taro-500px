/*
 * @Author: czy0729
 * @Date: 2019-07-01 10:23:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-01 16:09:35
 */
import { AtImagePicker } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ENV } from '@constants'
import './index.scss'

const cls = 'page-publish'

class Publish extends Component {
  config = {
    navigationBarTitleText: '发布',
    usingComponents: {
      'cropper': '../../components/wx/cropper/index'
    }
  }

  state = {
    files: [
      {
        url:
          'https://img.500px.me/photo/2836edacb49f182e739e83630c7a47920/457c1b50e9bb4a399713cbf20f3d8b54.jpg!p1'
      },
      {
        url:
          'https://img.500px.me/photo/1d43b5d9644229c8c1ff6c9e64c308403/b8b98285430a42afacf837f809c1c062.jpg!p1'
      },
      {
        url:
          'https://img.500px.me/photo/68cf581584fc08ceabce0477274035806/9d732dc2eb8f458391d0eeb90033fc8b.jpg!p1'
      }
    ]
  }

  onChange = files => {
    this.setState({
      files
    })
  }

  onFail = mes => {
    console.log(mes)
  }

  onImageClick = (index, file) => {
    console.log(index, file)
  }

  render() {
    const { files } = this.state
    return (
      <View
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
      >
        <AtImagePicker
          multiple
          files={files}
          onChange={this.onChange}
          onFail={this.onFail}
          onImageClick={this.onImageClick}
        />
        <cropper
          imageSrc='https://img.500px.me/photo/68cf581584fc08ceabce0477274035806/9d732dc2eb8f458391d0eeb90033fc8b.jpg!p5'
          cutRatio={0}
          cropperRatio={1}
        />
      </View>
    )
  }
}

export default Publish
