/*
 * @Author: czy0729
 * @Date: 2019-06-12 14:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-12 14:42:04
 */
import classNames from 'classnames'
import { AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import Component from '@components/component'

const cls = 'c-tabs-pane'

export default class TabsPane extends Component {
  static defaultProps = {
    className: '',
    current: 0,
    index: null
  }

  render() {
    const { className, current, index } = this.props
    return (
      <AtTabsPane
        className={classNames(cls, className)}
        current={current}
        index={index}
      >
        {this.props.children}
      </AtTabsPane>
    )
  }
}
