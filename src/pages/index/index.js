/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 18:05:54
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton } from 'taro-ui'
import './index.scss'

@inject('userStore')
@observer
class Index extends Component {
  render() {
    const { userStore } = this.props
    const { expires_in, user_id } = userStore.userInfo
    return (
      <View className='index container-outer'>
        <View className='flex'>
          <View className='flex-item'>
            <Text>{expires_in}</Text>
          </View>
          <Text>{user_id}</Text>
        </View>
        <AtButton
          className='mt-sm'
          type='primary'
          onClick={() =>
            userStore.setState({
              userInfo: {
                user_id: userStore.userInfo.user_id + 1
              }
            })
          }
        >
          改变数值
        </AtButton>
        <AtButton
          className='mt-sm'
          type='primary'
          onClick={userStore.fetchTest}
        >
          测试请求
        </AtButton>
      </View>
    )
  }
}

export default Index
