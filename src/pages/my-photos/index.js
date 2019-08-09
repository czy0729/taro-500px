/*
 * @Author: czy0729
 * @Date: 2019-07-19 17:23:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:48:26
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import MasonryList from '@app/masonry-list'
import { listDS } from '@constants/mock'

const cls = 'page-my-photos'

@inject('appStore')
@observer
class MyPhotos extends Component {
  config = {
    navigationBarTitleText: '我的图片'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <MasonryList data={listDS} />
      </CScrollView>
    )
  }
}

export default MyPhotos
