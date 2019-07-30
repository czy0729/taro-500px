/*
 * @Author: czy0729
 * @Date: 2019-06-13 18:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 15:48:14
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@components/base/c-scroll-view'
import { updateTabBar } from '@utils/app'
import Header from './header'
import Menu from './menu'
import List from './list'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class User extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  componentDidShow() {
    updateTabBar(this, 2)
  }

  render() {
    return (
      <CScrollView>
        <View className={`${cls}__container`}>
          <Header />
          <Menu />
          <List className='mt-48' />
        </View>
      </CScrollView>
    )
  }
}

export default User
