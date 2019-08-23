/*
 * @Author: czy0729
 * @Date: 2019-08-23 11:28:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 11:51:02
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import Tabs from '@base/tabs'
import TabsPane from '@base/tabs/pane'
import { rootCls } from '../ds'

const cls = `${rootCls}__list`

class List extends Taro.Component {
  static options = {
    addGlobalClass: true
  }

  state = {
    current: 0
  }

  onTabsClick = value => {
    this.setState({
      current: value
    })
  }

  render() {
    const { className } = this.props
    const { current } = this.state
    return (
      <View className={classNames(cls, className)}>
        <Tabs
          current={current}
          tabList={[{ title: '主页' }, { title: '动态' }]}
          onClick={this.onTabsClick}
        >
          <TabsPane current={current}>1</TabsPane>
          <TabsPane current={current} index={1}>
            2
          </TabsPane>
        </Tabs>
      </View>
    )
  }
}

export default observer(List)
