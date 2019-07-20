/*
 * @Author: czy0729
 * @Date: 2019-07-19 17:23:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 18:13:35
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { CScrollView } from '@components'
import MasonryList from '@components/app/masonry-list'
import { myVideosDS } from '@constants/mock'

const cls = 'page-my-videos'

@inject('appStore')
@observer
class MyVideos extends Component {
  config = {
    navigationBarTitleText: '我的视频'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <MasonryList data={myVideosDS} />
      </CScrollView>
    )
  }
}

export default MyVideos
