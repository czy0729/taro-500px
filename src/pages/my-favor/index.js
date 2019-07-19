/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:29:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 11:35:30
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { push } from '@utils'
import { CScrollView, ListItem } from '@components'
import { myFavorDS } from '@constants/mock'
import List from './list'

const cls = 'page-my-favor'

@inject('appStore')
@observer
class MyFavor extends Component {
  config = {
    navigationBarTitleText: '我的收藏'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <ListItem
          border={false}
          renderExtra={<Text className='t-28 l-48 t-sub'>更多征集</Text>}
        >
          <View className='flex-1'>
            <Text className='t-36 l-48 t-title t-b'>全部收藏</Text>
          </View>
        </ListItem>
        <ListItem
          arrow={false}
          renderExtra={
            <Text
              className='t-28 l-48 t-link'
              onClick={() => push('/pages/new-favor/index')}
            >
              添加收藏夹
            </Text>
          }
        >
          <View className='flex-1'>
            <Text className='t-36 l-48 t-title t-b'>收藏夹</Text>
          </View>
        </ListItem>
        <List className='mt-24' data={myFavorDS} />
      </CScrollView>
    )
  }
}

export default MyFavor
