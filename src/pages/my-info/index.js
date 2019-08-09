/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:06:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 17:05:23
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import CScrollView from '@base/c-scroll-view'
import CImage from '@base/c-image'
import ListItem from '@base/list-item'
import { push } from '@utils'

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
      <CScrollView>
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
            onClick={() => push('')}
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
              onClick={() => push('')}
            />
          ))}
        </View>
      </CScrollView>
    )
  }
}

export default MyInfo
