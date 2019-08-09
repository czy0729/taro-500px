/*
 * @Author: czy0729
 * @Date: 2019-07-18 09:38:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 15:39:06
 */
import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, ScrollView, Text } from '@tarojs/components'
import CButton from '@base/c-button'
import CImage from '@base/c-image'
import ListItem from '@base/list-item'
import { ENV } from '@constants'
import { followDS } from '@constants/mock'

const cls = 'page-follow'

@inject('appStore')
@observer
class Follow extends Component {
  config = {
    navigationBarTitleText: '我的关注'
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
        {followDS.list.map((item, index) => (
          <ListItem
            key={item.id}
            arrow={false}
            border={index !== followDS.list.length - 1}
            renderExtra={
              <CButton size='mini' type='default'>
                已关注
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
        ))}
      </ScrollView>
    )
  }
}

export default Follow
