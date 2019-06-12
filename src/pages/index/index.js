/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 10:25:47
 */
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { getWindowHeight } from '@utils/style'
import { ENV } from '@constants'
import Collect from './collect'
import Recommend from './recommend'
import Daren from './daren'
import List from './list'
import './index.scss'

const cls = 'page-index'

@inject('userStore')
@observer
class Index extends Component {
  componentDidMount() {
    const { userStore } = this.props
    userStore.fetchTest2(true)
  }

  onScrollToLower = () => {
    const { userStore } = this.props
    userStore.fetchTest2()
  }

  render() {
    const { userStore } = this.props
    return (
      <ScrollView
        className={cls}
        scrollY
        lowerThreshold={ENV.screenWidth * 0.5}
        onScrollToLower={this.onScrollToLower}
        style={{
          height: getWindowHeight(false)
        }}
      >
        <View className={`${cls}__container`}>
          <Collect />
          <Recommend className='mt-d' />
          <Daren className='mt-d' />
          <List className='mt-d' data={userStore.photo} />
        </View>
      </ScrollView>
    )
  }
}

export default Index
