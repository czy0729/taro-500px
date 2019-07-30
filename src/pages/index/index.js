/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 12:22:52
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@components/base/c-scroll-view'
import Tabs from '@components/base/tabs'
import TabsPane from '@components/base/tabs/pane'
import ActivityIndicator from '@components/base/activity-indicator'
import MasonryList from '@app/masonry-list'
import { updateTabBar } from '@utils/app'
import Search from './search'
import Collect from './collect'
import Recommend from './recommend'
import Daren from './daren'
import { rootCls } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '云知光'
  }

  state = {
    current: 1,
    loading: false
  }

  componentDidMount() {
    const { appStore } = this.props
    appStore.fetchPhoto(true)
  }

  componentDidShow() {
    updateTabBar(this, 0)
  }

  onScrollToLower = async () => {
    const { appStore } = this.props
    this.setState({
      loading: true
    })

    await appStore.fetchPhoto()
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
    const { appStore } = this.props
    const { current, loading } = this.state
    return (
      <View>
        <Search />
        <Tabs
          current={current}
          tabList={[{ title: '关注' }, { title: '发现' }]}
          onClick={this.onTabsClick}
        >
          <TabsPane current={current}>
            <CScrollView className={cls} onScrollToLower={this.onScrollToLower}>
              <View className={`${cls}__container`}>
                <Collect />
                <Recommend className='mt-40' />
                <Daren className='mt-40' />
                <View className='bg mt-64'>
                  <MasonryList data={appStore.photo} />
                  <ActivityIndicator show={loading} />
                </View>
              </View>
            </CScrollView>
          </TabsPane>
          <TabsPane current={current} index={1}>
            <CScrollView className={cls} onScrollToLower={this.onScrollToLower}>
              <View className={`${cls}__container-discovery`}>
                <MasonryList data={appStore.photo} />
                <ActivityIndicator show={loading} />
              </View>
            </CScrollView>
          </TabsPane>
        </Tabs>
      </View>
    )
  }
}

export default Index
