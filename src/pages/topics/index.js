/*
 * @Author: czy0729
 * @Date: 2019-08-13 15:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 15:34:05
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import CScrollView from '@base/c-scroll-view'
import TabsVertical from '@base/tabs-vertical'
import TabsVerticalPane from '@base/tabs-vertical/pane'
import ItemTopic from '@app/item-topic'
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
                onScrollToLower={this.onScrollToLower}
              >
                {item.data.map(i => (
                  <ItemTopic
                    key={i.id}
                    title={i.title}
                    image={i.image}
                    anwser={i.answer}
                    follow={i.follow}
                  />
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
