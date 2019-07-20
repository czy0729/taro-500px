import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import { CScrollView } from '@components'

const cls = 'page-'

@inject('appStore')
@observer
class extends Component {
  config = {
    navigationBarTitleText: ''
  }

  render() {
    return (
      <CScrollView
        className={cls}
      >

      </CScrollView>
    )
  }
}

export default
