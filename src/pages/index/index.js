/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-18 16:01:08
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Tabs, TabsPane, ActivityIndicator } from '@components'
import MasonryList from '@components/app/masonry-list'
import { ENV } from '@constants'
import Search from './search'
import Collect from './collect'
import Recommend from './recommend'
import Daren from './daren'
import './index.scss'

const cls = 'page-index'
const tabList = [{ title: '关注' }, { title: '发现' }]

@inject('userStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    current: 0,
    loading: false
  }

  componentDidMount() {
    const { userStore } = this.props
    userStore.fetchPhoto(true)
  }

  componentDidShow() {
    if (
      this &&
      this.$scope &&
      typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 0
      })
    }
  }

  onScrollToLower = async () => {
    const { userStore } = this.props
    this.setState({
      loading: true
    })

    await userStore.fetchPhoto()
    this.setState({
      loading: false
    })
  }

  onTabsClick = value => {
    this.setState({
      current: value
    })
  }

  render() {
    const { userStore } = this.props
    const { current, loading } = this.state
    return (
      <View>
        <Search />
        <Tabs current={current} tabList={tabList} onClick={this.onTabsClick}>
          <TabsPane current={current} index={0}>
            <ScrollView
              className={cls}
              scrollY
              lowerThreshold={ENV.screenWidth * 0.64}
              onScrollToLower={this.onScrollToLower}
              style={{
                height: ENV.windowHeight
              }}
            >
              <View className={`${cls}__container`}>
                <Collect />
                <Recommend className='mt-d' />
                <Daren className='mt-d' />
                <MasonryList
                  className='mt-d'
                  title='随心看'
                  data={userStore.photo}
                />
                <ActivityIndicator show={loading} />
              </View>
            </ScrollView>
          </TabsPane>
          <TabsPane current={current} index={1}>
            <ScrollView
              className={cls}
              scrollY
              lowerThreshold={ENV.screenWidth * 0.5}
              onScrollToLower={this.onScrollToLower}
              style={{
                height: ENV.windowHeight
              }}
            >
              <View className={`${cls}__container`}>
                <MasonryList title='随心看' data={userStore.photo} />
                <ActivityIndicator show={loading} />
              </View>
            </ScrollView>
          </TabsPane>
        </Tabs>
      </View>
    )
  }
}

export default Index
