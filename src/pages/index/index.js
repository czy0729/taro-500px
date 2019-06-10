/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 12:07:20
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Flex, FlexItem } from '@components'
import './index.scss'

@inject('counterStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render() {
    const {
      counterStore: { counter }
    } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Flex>
          <FlexItem>
            <Text>{counter}</Text>
          </FlexItem>
          <Text>{counter}</Text>
        </Flex>
      </View>
    )
  }
}

export default Index
