/*
 * @Author: czy0729
 * @Date: 2019-06-13 18:21:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 17:02:09
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Back, CScrollView, Tabs, TabsPane } from '@components'
import Header from './header'
import Menu from './menu'
import Home from './home'
import Timeline from './timeline'
import './index.scss'

const cls = 'page-zone'
const tabList = [{ title: '主页' }, { title: '动态' }]

@inject('appStore')
@observer
class Zone extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white'
  }

  state = {
    current: 0
  }

  onTabsClick = value => {
    this.setState({
      current: value
    })
  }

  render() {
    const { current } = this.state
    return (
      <View className={cls}>
        <Back />
        <CScrollView>
          <Header />
          <Menu />
          <Tabs
            className='mt-24'
            current={current}
            tabList={tabList}
            height='auto'
            onClick={this.onTabsClick}
          >
            <TabsPane current={current} index={0}>
              <Home />
            </TabsPane>
            <TabsPane current={current} index={1}>
              <Timeline />
            </TabsPane>
          </Tabs>
        </CScrollView>
      </View>
    )
  }
}

export default Zone
