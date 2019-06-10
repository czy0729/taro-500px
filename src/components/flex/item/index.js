/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:38:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 11:40:55
 */
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import './index.scss'

const cls = 'c-flex-item'

export default class FlexItem extends Component {
  render() {
    const { className, style } = this.props
    return (
      <View className={classNames(cls, className)} style={style}>
        {this.props.children}
      </View>
    )
  }
}
