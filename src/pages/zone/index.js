/*
 * @Author: czy0729
 * @Date: 2019-06-13 18:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 16:26:35
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ENV } from '@constants'
import Header from './header'
import Menu from './menu'

@inject('appStore')
@observer
class User extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  componentDidShow() {
    if (
      this &&
      this.$scope &&
      typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 2
      })
    }
  }

  render() {
    return (
      <ScrollView
        style={{
          height: ENV.windowHeight
        }}
      >
        <Header />
        <Menu />
      </ScrollView>
    )
  }
}

export default User
