/*
 * @Author: czy0729
 * @Date: 2019-08-13 15:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-13 15:54:29
 */
import classNames from 'classnames'
import { AtTabs } from 'taro-ui'
import Taro from '@tarojs/taro'
import Component from '@components/component'
import { ENV } from '@constants'
import './index.scss'

const cls = 'c-tabs-vertical'

export default class TabsVertical extends Component {
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
        tabDirection='vertical'
        onClick={onClick}
      >
        {this.props.children}
      </AtTabs>
    )
  }
}
