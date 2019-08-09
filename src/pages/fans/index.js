/*
 * @Author: czy0729
 * @Date: 2019-07-18 11:41:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:37:40
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, ScrollView, Text } from '@tarojs/components'
import CButton from '@base/c-button'
import CImage from '@base/c-image'
import ListItem from '@base/list-item'
import { ENV } from '@constants'
import { fansDS } from '@constants/mock'

const cls = 'page-fans'

@inject('appStore')
@observer
class Fans extends Component {
  config = {
    navigationBarTitleText: '我的粉丝'
  }

  render() {
    return (
      <ScrollView
        className={cls}
        style={{
          height: ENV.windowHeight
        }}
        scrollY
      >
        {fansDS.list.map((item, index) => {
          const isFollowed = item.status === 1
          return (
            <ListItem
              key={item.id}
              arrow={false}
              border={index !== fansDS.list.length - 1}
              renderExtra={
                <CButton
                  size='mini'
                  type={isFollowed ? 'default' : 'danger'}
                  ghost={!isFollowed}
                >
                  {isFollowed ? '已关注' : '回粉'}
                </CButton>
              }
            >
              <View className='flex-1'>
                <View className='flex'>
                  <CImage
                    src={item.avatar}
                    width={Taro.pxTransform(96)}
                    style={{
                      borderRadius: Taro.pxTransform(96),
                      overflow: 'hidden'
                    }}
                  />
                  <View className='flex-1 ml-16'>
                    <Text className='t-30 l-48 t-title'>{item.userName}</Text>
                    <Text className='t-26 l-48 t-sub'>{item.time}</Text>
                  </View>
                </View>
              </View>
            </ListItem>
          )
        })}
      </ScrollView>
    )
  }
}

export default Fans
