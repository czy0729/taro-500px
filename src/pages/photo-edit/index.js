/*
 * @Author: czy0729
 * @Date: 2019-07-31 11:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-31 14:04:05
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Back from '@components/base/back'
import NavigationTitle from '@components/base/navigation-title'
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
    filePath: ''
  }

  componentDidMount() {
    const {
      filePath = 'http://tmp/wx21c653ff5f2133fa.o6zAJsyYeEwdpsvwzIACtT-x-ndw.jNOc7R1UwaHY1e5f2118f710ba04a2fc1b5bdcabd226.jpg'
    } = this.$router.params

    this.setState({
      filePath
    })
  }

  render() {
    const { filePath } = this.state
    return (
      <View
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
      >
        <Back theme='light' />
        <NavigationTitle theme='light' text='图片编辑' />
        <Text>{filePath}</Text>
      </View>
    )
  }
}

export default PhotoEdit
