/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:06:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 11:06:26
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { ListItem, CImage } from '@components'
import { ENV } from '@constants'

const cls = 'page-my-info'
const DS = [
  {
    label: '昵称',
    value: '云友_本空设计'
  },
  {
    label: '性别',
    value: '男'
  },
  {
    label: '地区',
    value: ''
  },
  {
    label: '生日',
    value: ''
  },
  {
    label: '个人简介',
    value: ''
  }
]

@inject('appStore')
@observer
class MyInfo extends Component {
  config = {
    navigationBarTitleText: '个人资料'
  }

  render() {
    return (
      <ScrollView
        style={{
          height: ENV.windowHeight
        }}
        scrollY
      >
        <View className={`${cls}__container`}>
          <ListItem
            text='头像'
            renderExtra={
              <CImage
                src={require('../../assets/pages/index/11.png')}
                width={Taro.pxTransform(136)}
                style={{
                  borderRadius: Taro.pxTransform(136),
                  overflow: 'hidden'
                }}
              />
            }
          />
          {DS.map(item => (
            <ListItem
              key={item.label}
              text={item.label}
              renderExtra={
                <Text className='t-30 l-48 t-default'>
                  {item.value || '未设置'}
                </Text>
              }
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}

export default MyInfo
