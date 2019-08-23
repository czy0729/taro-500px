/*
 * @Author: czy0729
 * @Date: 2019-08-13 15:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 11:44:22
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import CImage from '@base/c-image'
import TabsVertical from '@base/tabs-vertical'
import TabsVerticalPane from '@base/tabs-vertical/pane'
import { back } from '@utils'
import { transform } from '@utils/style'
import SearchBar from './search-bar'
import { rootCls, tabList } from './ds'
import './index.scss'

const cls = rootCls

@inject('appStore')
@observer
class Topics extends Component {
  config = {
    navigationBarTitleText: '话题',
    navigationBarBackgroundColor: '#ededed'
  }

  state = {
    current: 0
  }

  onTabsClick = value => {
    this.setState({
      current: value
    })
  }

  onAddTag = tag => {
    const { appStore } = this.props
    appStore.addPhotoEditTag({
      name: tag
    })
    back()
  }

  render() {
    const { current } = this.state
    const info = Taro.getSystemInfoSync()
    return (
      <View className={cls}>
        <SearchBar onAdd={this.onAddTag} />
        <TabsVertical
          current={current}
          tabList={tabList}
          height={transform(info.windowHeight - 48)}
          onClick={this.onTabsClick}
        >
          {tabList.map((item, index) => (
            <TabsVerticalPane key={item.title} current={current} index={index}>
              <CScrollView
                className={cls}
                showTabBar
                onScrollToLower={this.onScrollToLower}
              >
                {item.data.map(i => (
                  <View key={i.title} className={`${cls}__item flex`}>
                    <CImage src={i.image} width={Taro.pxTransform(88)} radius />
                    <View className='ml-16'>
                      <Text className='t-28 l-32 t-desc t-c1'>{i.title}</Text>
                      <View className='flex mt-16'>
                        <Text className='t-20 l-24 t-sub'>
                          回答 {i.anwser}
                        </Text>
                        <Text className='t-20 l-24 t-sub ml-32'>
                          关注 {i.follow}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </CScrollView>
            </TabsVerticalPane>
          ))}
        </TabsVertical>
      </View>
    )
  }
}

export default Topics
