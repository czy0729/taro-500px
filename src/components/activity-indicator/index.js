/*
 * @Author: czy0729
 * @Date: 2019-06-13 11:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 12:13:50
 */
import classNames from 'classnames'
import { AtActivityIndicator } from 'taro-ui'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Component from '@components/component'
import { colorMain } from '@constants/style'
import './index.scss'

const cls = 'c-activity-indicator'

export default class ActivityIndicator extends Component {
  static defaultProps = {
    className: '',
    style: null,
    show: false,
    size: 48,
    color: colorMain,
    content: ''
  }

  render() {
    const { className, style, show, size, color, content } = this.props
    return (
      <View className={classNames(cls, className)} style={style}>
        {show && (
          <AtActivityIndicator size={size} color={color} content={content} />
        )}
      </View>
    )
  }
}
