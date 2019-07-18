/*
 * @Author: czy0729
 * @Date: 2019-06-13 18:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 18:06:13
 */
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ENV } from '@constants'
import Header from './header'
import Menu from './menu'
import List from './list'
import './index.scss'

const cls = 'page-user'

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
        scrollY
      >
        <View className={`${cls}__container`}>
          <Header />
          <Menu />
          <List className='mt-48' />
        </View>
      </ScrollView>
    )
  }
}

export default User
