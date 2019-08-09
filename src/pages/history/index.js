/*
 * @Author: czy0729
 * @Date: 2019-07-20 12:05:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:50:45
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import MasonryList from '@app/masonry-list'
import { listDS } from '@constants/mock'

const cls = 'page-history'

@inject('appStore')
@observer
class History extends Component {
  config = {
    navigationBarTitleText: '浏览历史'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <MasonryList data={listDS} />
      </CScrollView>
    )
  }
}

export default History
