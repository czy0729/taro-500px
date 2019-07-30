/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:38:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-30 14:42:15
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import Component from '@components/component'
import { ENV } from '@constants'

const cls = 'c-scroll-view'

export default class CScrollView extends Component {
  static defaultProps = {
    className: '',
    onScrollToLower: Function.prototype
  }

  render() {
    const { className, onScrollToLower } = this.props
    return (
      <ScrollView
        className={classNames(cls, className)}
        style={{
          height: ENV.windowHeight
        }}
        scrollY
        lowerThreshold={ENV.screenWidth * 0.5}
        onScrollToLower={onScrollToLower}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
