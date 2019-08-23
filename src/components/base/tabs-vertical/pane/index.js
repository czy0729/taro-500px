/*
 * @Author: czy0729
 * @Date: 2019-06-12 14:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-13 15:54:15
 */
import classNames from 'classnames'
import { AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import Component from '@components/component'

const cls = 'c-tabs-vertical-pane'

export default class TabsVerticalPane extends Component {
  static defaultProps = {
    className: '',
    current: 0,
    index: 0
  }

  render() {
    const { className, current, index } = this.props
    return (
      <AtTabsPane
        className={classNames(cls, className)}
        current={current}
        index={index}
        tabDirection='vertical'
      >
        {this.props.children}
      </AtTabsPane>
    )
  }
}
