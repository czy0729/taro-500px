import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CScrollView from '@components/base/c-scroll-view'

const cls = 'page-__'

@inject('appStore')
@observer
class __ extends Component {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    return (
      <CScrollView className={cls}>

      </CScrollView>
    )
  }
}

export default __
