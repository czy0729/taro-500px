/*
 * @Author: czy0729
 * @Date: 2019-07-17 15:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 15:27:58
 */
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Component from '@components/component'
import { ENV } from '@constants'
import './index.scss'

const cls = 'c-text'

export default class CText extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.oneOf([
      'plain',
      'desc',
      'sub',
      'main',
      'primary',
      'success',
      'danger',
      'warning'
    ]),
    size: PropTypes.number,
    lineHeight: PropTypes.number,
    text: PropTypes.any
  }

  static defaultProps = {
    className: '',
    styles: null,
    type: null,
    size: 14,
    lineHeight: null,
    text: ''
  }

  render() {
    const {
      className,
      style,
      styles,
      type,
      size,
      lineHeight,
      text
    } = this.props

    // 小于等于2的lineHeight用作比率
    let _style
    if (lineHeight) {
      _style = {
        lineHeight: Taro.pxTransform(
          lineHeight <= 2 ? 2 * size * lineHeight : 2.86 * lineHeight
        )
      }
    }

    if (ENV.RN) {
      return (
        <Text
          className={classNames(
            cls,
            {
              [`${cls}--${type}`]: type,
              [`${cls}--${size}`]: size
            },
            className
          )}
          style={this.composeStyle(_style, styles || style)}
        >
          {text || this.props.children}
        </Text>
      )
    }

    // H5和小程序Text不是块, 模拟跟RN保持一致
    return (
      <View className={className}>
        <Text
          className={classNames(cls, {
            [`${cls}--${type}`]: type,
            [`${cls}--${size}`]: size
          })}
          style={this.composeStyle(_style, styles || style)}
        >
          {text || this.props.children}
        </Text>
      </View>
    )
  }
}
