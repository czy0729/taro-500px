/*
 * @Author: czy0729
 * @Date: 2019-06-12 11:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 16:46:17
 */
import classNames from 'classnames'
import { AtTabs } from 'taro-ui'
import Taro from '@tarojs/taro'
import Component from '@components/component'
import { ENV } from '@constants'
import './index.scss'

const cls = 'c-tabs'

export default class Tabs extends Component {
  static defaultProps = {
    className: '',
    current: 0,
    tabList: [],
    height: ENV.windowHeight,
    onClick: Function.prototype
  }

  render() {
    const { className, current, tabList, height, onClick } = this.props
    return (
      <AtTabs
        className={classNames(cls, className)}
        current={current}
        tabList={tabList}
        height={height}
        onClick={onClick}
      >
        {this.props.children}
      </AtTabs>
    )
  }
}
