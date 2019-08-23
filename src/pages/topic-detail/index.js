/*
 * @Author: czy0729
 * @Date: 2019-08-23 09:51:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 11:46:15
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@components/base/c-scroll-view'
import Top from './top'
import List from './list'

const cls = 'page-topic-detail'

@inject('appStore')
@observer
class TopicDetail extends Component {
  config = {
    navigationBarTitleText: '话题'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <Top />
        <List />
      </CScrollView>
    )
  }
}

export default TopicDetail
