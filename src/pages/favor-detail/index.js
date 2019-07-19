/*
 * @Author: czy0729
 * @Date: 2019-07-19 11:41:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 12:14:45
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { CScrollView } from '@components'
import MasonryList from '@components/app/masonry-list'
import { listDS } from '@constants/mock'
import './index.scss'

const cls = 'page-favor-detail'

@inject('appStore')
@observer
class FavorDetail extends Component {
  config = {
    navigationBarTitleText: '我的收藏'
  }

  componentDidMount() {
    Taro.setNavigationBarTitle({
      title: `共${listDS.list.length}个内容`
    })
  }

  render() {
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__container`}>
          <Text className='t-36 l-48 t-title'>别墅氛围感光布局</Text>
          <Text className='t-28 t-sub mt-32'>别墅类高端室内</Text>
        </View>
        <MasonryList data={listDS} />
      </CScrollView>
    )
  }
}

export default FavorDetail
