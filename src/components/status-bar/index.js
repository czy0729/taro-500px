/*
 * @Author: czy0729
 * @Date: 2019-07-17 17:53:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 18:06:26
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import { statusBarHeight } from '@constants/style'

const cls = 'c-status-bar'

export default class StatusBar extends Component {
  static defaultProps = {
    backgroundColor: 'transparent'
  }

  render() {
    const { className, backgroundColor } = this.props
    return (
      <View
        className={classNames(cls, className)}
        style={{
          height: Taro.pxTransform(statusBarHeight),
          backgroundColor
        }}
      />
    )
  }
}
