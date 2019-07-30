/*
 * @Author: czy0729
 * @Date: 2019-07-18 17:38:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-20 13:42:05
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
    onScrollToLower: null
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
        lowerThreshold={
          onScrollToLower === null ? undefined : ENV.screenWidth * 0.64
        }
        onScrollToLower={onScrollToLower === null ? undefined : onScrollToLower}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
