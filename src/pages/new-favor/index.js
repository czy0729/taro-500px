/*
 * @Author: czy0729
 * @Date: 2019-07-18 18:13:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:47:05
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import CInput from '@base/c-input'
import CTextarea from '@base/c-textarea'
import CButton from '@base/c-button'
import './index.scss'

const cls = 'page-new-favor'

@inject('appStore')
@observer
class NewFavor extends Component {
  config = {
    navigationBarTitleText: '新建收藏'
  }

  render() {
    return (
      <CScrollView className={cls}>
        <View className={`${cls}__container`}>
          <Text className='t-36 l-48 t-title t-b'>新建收藏夹</Text>
          <View className={`${cls}__ipt mt-32`}>
            <CInput placeholder='收藏夹名称，最多30字' />
          </View>
          <View className={`${cls}__textarea mt-8`}>
            <CTextarea placeholder='收藏夹描述' />
          </View>
        </View>
        <View className={`${cls}__fixed`}>
          <CButton type='danger'>确定</CButton>
        </View>
      </CScrollView>
    )
  }
}

export default NewFavor
