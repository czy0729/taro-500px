/*
 * @Author: czy0729
 * @Date: 2019-07-30 15:04:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 15:05:16
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

const cls = 'page-empty'

class Empty extends Component {
  config = {
    navigationBarTitleText: '占位页'
  }

  render() {
    return <View className={cls} />
  }
}

export default Empty
